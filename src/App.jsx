import { DeepChat } from "deep-chat-react";
import "./App.css";
import { useRef, useState } from "react";
import axios from "axios";
export default function App() {
  let stringdf = "";
  const initialMessages = [
    { role: "ai", text: "Hey! What would you like to buy today ?" }
  ];
  const [Chat, setChat] = useState([{ "role": "ai", "text": "You are a chatbot who will ask questions to gather more information about prodict User have asked. And remember to ask question only one at a time" }]);
  const [sideBarResponse, setSideBar] = useState([]);
  // const [userQuery, setUserQuery] = useState([]);

  const customHeaders = {
    'Content-Type': 'application/json',
    'Content-Length': 'your-content-length', // Replace with the actual content length
    'Host': 'your-host', // Replace with the actual host
    'User-Agent': 'your-user-agent', // Replace with the actual user agent
    'Accept': 'application/json',
  };
  let dex = useRef("");
  const config = {
    headers: customHeaders,
  };

  const SideBarFunction = async (item) => {
    await axios.post("http://localhost:8000/getProduct", { "data": "Do you have any specific preferences for the opera… (iOS, Android, etc.) or brand of the smartphone?" }).then((res) => {
      console.log(res.data);
      setSideBar((prev) => [...prev, res.data.res2]);
      // setChat((prev) => [...prev, res.data.res1]);
    }
    ).catch((err) => {
      console.log(err);
    })
    // sideBarResponse.push(item);
    // setSideBar((prev) => [...prev, item]);
  }
  const InsertItems = async (item) => {

    // await SideBarFunction(item.current.value);
    // userQuery.push(item);
    console.log(item.current.value);
    setChat((prev) => [...prev, { "role": "ai", "text": item.current.value }]);
    axios.post("http://localhost:8000/query", {
      "Array": [{ "role": "system", "content": "You are a chatbot who will ask questions to gather more information about prodict User have asked. And remember to ask question only one at a time" },
      { "role": "user", "content": "I want new smartphone with good camera" },
      { "role": "system", "content": "What is your budget for a new smartphone?" },
      { "role": "user", "content": "under Rs. 50k" }
      ]
    }).then((res) => {
      console.log(res.data);
      stringdf = res.data;
      setChat((prev) => [...prev, item]);

    }).catch((err) => {
      console.log(err);
    })


  }
  const smartphones = [
    {
      name: 'Ulefone Unlocked Cell Phones, Note 14 Android 12 Unlocked Smartphones, 4500mAh Massive Battery, 7GB + 16GB, 6.52" Display, Ultra-Slim Lightweight, Dual AI Camera, GPS OTG, US Version - Black',
      url: 'https://www.amazon.com/Ulefone-14-Smartphones-Ultra-Slim-Lightweight/dp/B0BG7223MK/ref=sr_1_1?keywords=any+iOS+Android+brand+smartphone&qid=1698192405&sr=8-1',
      image: 'https://m.media-amazon.com/images/I/618dnvsz4TL._AC_UY218_.jpg',
      price: 79
    },
    {
      name: 'Ulefone Unlocked Cell Phones, Note 16 Pro 12GB + 128GB, 8-Core, 6.52" HD+ Display Unlocked Smartphone, Android 13, 50MP + 8MP, 4400 mAh, Dual 4G LTE, Fingerprint/Face Detection, T-Mobile, Blue',
      url: 'https://www.amazon.com/Ulefone-Unlocked-Smartphone-Fingerprint-Detection/dp/B0C69DNN5C/ref=sr_1_2?keywords=any+iOS+Android+brand+smartphone&qid=1698192405&sr=8-2',
      image: 'https://m.media-amazon.com/images/I/71fc9YO9F5L._AC_UY218_.jpg',
      price: 109
    }
  ];

  console.log(smartphones);

  /*
  {"name":"SAMSUNG 32-Inch Class QLED 4K Q60C Series Quantum HDR, Dual LED, Object Tracking Sound Lite, Q-Symphony, Motion Xcelerator, Gaming Hub, Smart TV with Alexa Built-in (QN32Q60C, 2023 Model)",
  "url":"https://www.amazon.com/SAMSUNG-Tracking-Q-Symphony-Xcelerator-QN32Q60C/dp/B0BVMWGKCC/ref=sr_1_1?keywords=4K+LED+TV&qid=1698179973&sr=8-1",
  "image":"https://m.media-amazon.com/images/I/71bmtncxa+L._AC_UY218_.jpg","price":477}
  */
  // demo/style/textInput are examples of passing an object directly into a property
  // initialMessages is an example of passing a state object into a property
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h3>Amazon Bot</h3>
      <div style={{ display: "flex", gap: "4px" }}>
        {/* <DeepChat
          // on new event
          onNewMessage={(message) => {
            console.log(message);
            setUserQuery((prev) => [...prev, message]);
            InsertItems(message);
          }}
          demo={true}
          style={{ borderRadius: "10px" }}
          textInput={{ placeholder: { text: "Welcome to the demo!" } }}
          initialMessages={[
            { role: "user", text: "Hey, how are you today?" },
            { role: "ai", text: "I am doing very well!" }
          ]}
        /> */}
        <form >
          <div style={{ height: "70vh", width: "30vw" }}>
            {Chat.map((item) => {
              return (
                <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}  >
                  <h6>{item.role} : {item.text}</h6>
                </div>
              )

            }
            )}
            {
             Chat.length > 1 && smartphones.map((item) => {
                return (
                  <div style={{ display: "flex", flexDirection: "column", textAlign: "center", color: "white" }}  >
                    <h6 >{item.url}</h6>
                    <h6>{item.name}</h6>
                  </div>
                )

              }
              )

            }




          </div>
          <input ref={dex} />
          <button type="submit" onClick={(e) => { e.preventDefault(); InsertItems(dex) }}>Submit</button>
        </form>

      </div>
    </div>
  );
}
// App.js
// import React, { useState } from "react";
// import DeepChatComponent from "./DeepChatComponent";
// import Sidebar from "./Sidebar";
// import axios from "axios";

// function App() {
//   // const [userQuery, setUserQuery] = useState([]);
//   // const [sideBarResponse, setSideBar] = useState([]);
//   // const [chatMessages, setChatMessages] = useState([
//   //   { role: "ai", text: "You are a chatbot who will ask questions to gather more information about the product the user has asked. And remember to ask questions only one at a time." },
//   // ]);

//   const insertItems = async (item) => {
//     // You can add your insertion logic here.
//     // Example: setSideBar([...sideBarResponse, item]);
//     // Example: Add the user query to userQuery state.
//   };

//   // const handleNewMessage = (message) => {
//   //   setUserQuery([...userQuery, message]);
//   //   insertItems(message);
//   //   console.log(userQuery);
//   // };

//   return (
//     <div className="App">
//       <h3>Amazon Bot</h3>
//       <div style={{ display: "flex", gap: "4px" }}>
//         <DeepChatComponent   />
//         <Sidebar sideBarResponse={sideBarResponse} />
//       </div>
//     </div>
//   );
// }

// export default App;
