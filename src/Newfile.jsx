// import { DeepChat } from "deep-chat-react";
// import "./App.css";
// import { useRef, useState } from "react";
// import axios from "axios";
// export default function App() {
//   let [Chat, setChat] = useState();
//   let stringdf = "";
//   let initialMessages = [
//     { role: "ai", text: "Hey! What would you like to buy today ?" }
//   ];
//   // let [sideBarResponse, setSideBar] = useState([]);
//   // const [userQuery, setUserQuery] = useState([]);

//   const customHeaders = {
//     'Content-Type': 'application/json',
//     'Content-Length': 'your-content-length', // Replace with the actual content length
//     'Host': 'your-host', // Replace with the actual host
//     'User-Agent': 'your-user-agent', // Replace with the actual user agent
//     'Accept': 'application/json',
//   };
//   let dex = useRef("");
//   const config = {
//     headers: customHeaders,
//   };

//   const SideBarFunction = async (item) => {
//     await axios.post("http://localhost:8000/getProduct", { "data": "Do you have any specific preferences for the opera… (iOS, Android, etc.) or brand of the smartphone?" }).then((res) => {
//       console.log(res.data);
//       setSideBar((prev) => [...prev, res.data.res2]);
//       // setChat((prev) => [...prev, res.data.res1]);
//     }
//     ).catch((err) => {
//       console.log(err);
//     })
 
//   }
//   const InsertItems = async (item) => {
 
//     console.log(item.current.value);
//     setChat([...Chat, { "role": "Ai", "text": item.current.value }]);

//     axios.post("http://localhost:8000/query", {
//       "Array": [{ "role": "system", "content": "You are a chatbot who will ask questions to gather more information about prodict User have asked. And remember to ask question only one at a time" },
//       { "role": "user", "content": "I want new smartphone with good camera" },
//       { "role": "system", "content": "What is your budget for a new smartphone?" },
//       { "role": "user", "content": "under Rs. 50k" }
//       ]
//     }).then((res) => {
//       console.log(res.data);
//       stringdf = res.data;
//       setChat([...Chat, item]);
//       localStorage.setItem("chat", JSON.stringify(Chat));

//     }).catch((err) => {
//       console.log(err);
//     })


//   }
 

//   return (
//     <div className="App" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center", textAlign: "center", }}>
//       <h3>Amazon Bot</h3>
//       <div style={{ display: "flex", gap: "4px" }}>

//         <div style={{ height: "70vh", width: "30vw", border: "1px solid" }}>
//           {Chat.map((item) => {
//             return (
//               item.role && <div style={{ display: "flex", flexDirection: "column", textAlign: "center" }}  >
//                 <h6>{item.role} : {item.text}</h6>
//               </div>
//             )

//           }
//           )}
//         </div>
//         <form style={{ display: "flex", flexDirection: "column" }}>

//           <input ref={dex} style={{ height: "15rem", borderRadius: "5px" }} />
//           <button type="submit" onClick={(e) => { e.preventDefault(); InsertItems(dex) }}>Submit</button>
//         </form>

//       </div>
//     </div>
//   );
// }

