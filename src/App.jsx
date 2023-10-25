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
 

  console.log(smartphones);

  
  return (
    <div className="App" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <h3>Amazon Bot</h3>
      <div style={{ display: "flex", gap: "4px" }}>
    
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
 
