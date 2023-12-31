
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import puppeteer from 'puppeteer';
const app = express();
import compression from 'compression';

import axios from 'axios';

const OPENAI_API_KEY = ' ';// key
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions?Content-Type=application/json';
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());
app.use(morgan('dev'));
app.use(compression());

const getResult = async (data) => {
    // var data = JSON.stringify(req.body.data);
    console.log("data", data);
    (async () => {
        // wrapper to catch errors
        try {

            // create a new browser instance
            const browser = await puppeteer.launch({ headless: false, args: ['--no-sandbox', '--disable-setuid-sandbox'] });

            // create a page inside the browser;
            const page = await browser.newPage();

            // navigate to a website and set the viewport
            await page.setViewport({ width: 1280, height: 800 });
            await page.goto(domain, {
                timeout: 3000000
            });

            // search and wait the product list
            await page.type('#twotabsearchtextbox', data);
            await page.click('#nav-search-submit-button');
            await page.waitForSelector('.s-image');

            // create a screenshots
            await page.screenshot({ path: 'search-iphone-x.png' });

            const products = await page.evaluate(() => {
                // let wholeArray =document.querySelectorAll('#search > span.rush-component.s-latency-cf-section > div');
                // console.log(wholeArray);
                const links = Array.from(document.querySelectorAll('.s-result-item'));
                return links.map(link => {
                    if (link.querySelector(".a-price-whole")) {
                        return {
                            name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
                            url: link.querySelector(".a-link-normal.a-text-normal").href,
                            image: link.querySelector(".s-image").src,
                            price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
                        };
                    }
                }).slice(0, 5);
            });
            // close the browser
            await browser.close();
            console.log(products);
            return (JSON.stringify(products));

            // close the browser
            await browser.close();
        } catch (error) {
            // display errors
            return (error);
            console.log(error)
        }
    })();
}
const config = {
    region: 'ap-south-1',
    credentials: {
        accessKeyId: ' ',// aws auth
        secretAccessKey: ' '
    },
};



const client = new ComprehendClient(config);

import { ComprehendClient, DetectTargetedSentimentCommand } from "@aws-sdk/client-comprehend";
app.post('/getProduct', async (req, res) => {
    try {
        // return res.json({ "ai": "data" });
        const domain = "https://www.amazon.com";
        let text = req.body.data;
        console.log("text==========", text)
        const input = { // DetectTargetedSentimentRequest
            Text: text, // required
            LanguageCode: "en" || "es" || "fr" || "de" || "it" || "pt" || "ar" || "hi" || "ja" || "ko" || "zh" || "zh-TW", // required
        };
        const command = new DetectTargetedSentimentCommand(input);
        // console.log("command",command)
        const x = async () => {
            const response = await client.send(command);

            // console.log("response ",JSON.stringify(response)); // CommandResponse
            let s = "";
            for (let i = 0; i < response.Entities.length; i++) {
                if (response.Entities[i].Mentions[0].Type !== "PERSON")
                    // console.log(response.Entities[i].Mentions[0].Text);
                    s = s + response.Entities[i].Mentions[0].Text + " ";
            }
            console.log("string =======", s)

            return s;
            // return res.json(getResult(s));
        }
        let data = await x();
        // let result = await getResult(get1);
        const answer = async () => {
            // wrapper to catch errors
            try {

                // create a new browser instance
                const browser = await puppeteer.launch();

                // create a page inside the browser;
                const page = await browser.newPage();

                // navigate to a website and set the viewport
                await page.setViewport({ width: 1280, height: 800 });
                await page.goto(domain, {
                    timeout: 3000000
                });

                // search and wait the product list
                await page.type('#twotabsearchtextbox', data);
                await page.click('#nav-search-submit-button');
                await page.waitForSelector('.s-image');

                // create a screenshots
                await page.screenshot({ path: 'search-iphone-x.png' });

                const products = await page.evaluate(() => {
                    // let wholeArray =document.querySelectorAll('#search > span.rush-component.s-latency-cf-section > div');
                    // console.log(wholeArray);

                    const links = Array.from(document.querySelectorAll('.s-result-item'));
                    return links.map(link => {
                        if (link.querySelector(".a-price-whole")) {
                            return {
                                name: link.querySelector(".a-size-medium.a-color-base.a-text-normal").textContent,
                                url: link.querySelector(".a-link-normal.a-text-normal").href,
                                image: link.querySelector(".s-image").src,
                                price: parseFloat(link.querySelector(".a-price-whole").textContent.replace(/[,.]/g, m => (m === ',' ? '.' : ''))),
                            };
                        }
                    }).slice(0, 5);
                });
                // close the browser
                await browser.close();
                // console.log(products);
                return (JSON.stringify(products));

                // close the browser
                await browser.close();
            } catch (error) {
                // display errors
                return JSON.stringify(error);
                console.log(error)
            }
        };
        let res2 = await answer()
        // console.log("Hello");
        console.log(res2);
        return res.json({ res2: JSON.parse(res2), data: data });
    }
    catch (e) {
        console.log(e);
        return res.json({ error: e })
    }

});

app.post('/query', async (req, res) => {

    const query = [{ "role": "system", "content": "You are a chatbot who will ask questions to gather more information about prodict User have asked. And remember to ask question only one at a time" }, ...req.body.Array];
    // return res.json({ "ai": "query" });
    console.log("query ", query);
    const chatbotMessage = {
        model: 'gpt-3.5-turbo',
        "messages": query,
        temperature: 0.7
    };

    await axios.post(OPENAI_API_URL, chatbotMessage, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
    })
        .then(response => {
            const reply = response.data.choices[0].message.content;
            // console.log('Chatbot: ' + reply);
            return res.json({ "ai": reply });
        })
        .catch(error => {
            console.error('Error:', error);
            return res.json({ error: error })
        });

});

app.listen(8000, () => {
    console.log('Server listening on port 3000');
});