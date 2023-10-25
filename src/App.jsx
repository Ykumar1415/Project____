import React from 'react'
import { useState } from 'react'
import axios from 'axios'
function App() {
  let [Chat, setChat] = useState([{ role: "system", content: "Hey! What would you like to buy today ?" }]);

  let [isloading, setisloading] = useState(false);
  // let[userChat , setUserChat] = useState([ ])
  let [SideBar, setSideBar] = useState([]);
  let [strCount, setStrCount] = useState("");
  let [SendToComp, setSendToComp] = useState("");
  // let SendToComp = "";

  const SideBarFunction = async (item) => {

    item = item + SendToComp;
    setSendToComp(SendToComp + " " + strCount);
    console.log("send to compt ::: ", SendToComp)
    await axios
      .post("http://localhost:8000/getProduct", {
        data: item.toString(),
      })
      .then((res) => {
        console.log(res.data);
        let temp = (res.data.res2).filter(item => item !== null);
        console.log(temp);
        setSideBar([...SideBar, ...temp]);
        // setSendToComp(SendToComp + " " + res.data.data);
        setSendToComp(SendToComp + " " + res.data.data);
        console.log("sidebar", SideBar);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const InsertItems = async (item) => {
    setisloading(true)
    await SideBarFunction(item);
    await axios
      .post("http://localhost:8000/query", {
        Array: [...Chat, { role: "user", content: strCount }]
      })
      .then(async (res) => {
        console.log(res.data);

        console.log(Chat);
        setChat([...Chat, ...[{ role: "user", content: item }, { role: "system", content: res.data.ai }]]);
      })
      .catch((err) => {
        console.log(err);
      });
    setisloading(false);
  };
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
      <h2>Amazon Bot</h2>
      <div id="chatbot" style={{ display: "flex", borderRadius: "10px" }}>
        <div>
          <div style={{ height: "70vh", width: "30vw", border: "1px solid", overflow: "scroll" }}>
            {Chat.map((item) => (

              <div id="conversation">
                <div class="chatbot-message" style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                  <img src={item.role === "system" ? "bot.png" : "pngegg.png"} alt="" loading='lazy' width={30} height={30} />
                  <p class="chatbot-text">   {item.content} </p>
                </div>
              </div>
            ))
            }

          </div>
          <form style={{ display: "flex", flexDirection: "column" }}>
            <textarea onChange={(e) => { setStrCount(e.target.value) }} style={{ height: "3rem", borderRadius: "5px", marginTop: "5px" }} />
            <button type="submit" onClick={async (e) => { e.preventDefault(); await InsertItems(strCount) }}>{isloading ? "Loading ..." : "Submit"}</button>
          </form>
        </div>
        <div style={{ height: "70vh", width: "30vw", border: "1px solid", overflow: "scroll", padding: "10px", borderRadius: "10px" }}>
          {SideBar.map((item) => (
            // <div style={{ display: "flex", flexDirection: "column", textAlign: "center", color: "white" }} key={item.text}>
            //   <h6>{item.ai}</h6>
            // </div>
            <div id="conversation">
              <div class="chatbot-message" style={{ display: "flex", justifyContent: "center", alignItems: "center", fontSize: "1rem" }}>
                <img src={item.image} alt="" loading='lazy' width={50} height={50} />
                <div style={{ display: "flex", flexDirection: "column" }}>

                  <a href={item.url} target="_blank">
                    <p className="chatbot-text">
                      Link
                    </p>
                  </a>
                  <p class="chatbot-text">{item.name}</p>
                </div>
              </div>
            </div>
          ))
          }
        </div>

      </div>
    </div>
  );
}

export default App