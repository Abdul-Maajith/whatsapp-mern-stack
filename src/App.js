import React, { useEffect, useState } from "react";
import './App.css';
import Sidebar from "./components/Sidebar";
import ChatComponent from "./components/ChatComponent";
import Pusher from "pusher-js";
import axios from "./axios.js";

function App() {
  const [messages, setMessages] = useState([]);

  // axios.get("/messages/sync")
  //     .then((response) => {
  //       setMessages(response.data)
  //   })
  useEffect(() => {
    const fetchData = async () => {
      const resp = await fetch("http://localhost:9000/messages/sync");
      const data = await resp.json()
      setMessages(data)
    }

    fetchData();
  }, [])

  useEffect(() => {
    const pusher = new Pusher("a8443ec647825c12a907", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessages) => {
      // alert(JSON.stringify(newMessages));
      setMessages([...messages, newMessages]);
    });

    // CleanUp function ->  when the dependencies to that hook changes and the effect hook needs to run again with new values

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };

  }, [messages])

  console.log(messages)

  return (
    <div className="app">

      <div className="app_body">
        <Sidebar />
        <ChatComponent messages={messages}/>
      </div>
    </div>
  );
}

export default App;
