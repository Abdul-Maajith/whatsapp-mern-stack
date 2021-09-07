import React from 'react'
import '../App.css';
import { IconButton, Avatar } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SendIcon from "@material-ui/icons/Send";
import MicIcon from "@material-ui/icons/Mic";
import axios from "../axios.js";

const ChatComponent = ({ messages }) => {
  const [input, setInput] = React.useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: "Maajee",
      timestamp: "Just now!",
      received: false,
    });

    setInput("");
  }

    return (
      <div className="chat">
        <div className="chat_header">
          <Avatar />

          <div className="chat_headerInfo">
            <h3>Room name</h3>
            <p>Last seen at...</p>
          </div>

          <div className="chat_headerRight">
            <IconButton>
              <SearchOutlinedIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>

        <div className="chat_body">
          {messages.map(({name, message, received, id}) => {
            return (
              <p 
              className={`chat_message ${!received && "chat_receiver"}`}
              key ={id}
              >
                <span className="chat_name">{name}</span>
                {message}
                <span className="chat_timeStamp">
                  {new Date().toUTCString()}
                </span>
              </p>
            );
          })}
        </div>

        <div className="chat_footer">
          <IconButton>
            <InsertEmoticonIcon />
           </IconButton>
            <form>
                <input 
                  type="text"
                  placeholder="Type a message.."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                <button 
                  type="submit" 
                  onClick={sendMessage}
                >
                  <SendIcon />
                </button>
            </form>
            <MicIcon />
        </div>
      </div>
    );
}

export default ChatComponent
