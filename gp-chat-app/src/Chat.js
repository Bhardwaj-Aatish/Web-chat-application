import React from 'react'
import useState from 'react';
import './Chat.css';
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from "@material-ui/icons"
import axios from './axios';
// import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
function Chat( {messages} ) {
    const [input, setInput] = useState("");
    const sendMessage = async (e) =>{
        e.preventDefault();

        axios.post('/messages/new' , {
            messages: input,
            name: "Demon App",
            timestamp: "just now!",
            received: false,

        })
        setInput("");

    };
    return (
        <div className="chat">
            <div className="chat_header">
                <IconButton>
                    <Avatar />
                </IconButton>
                <div className="chat_headerInfo">
                    <h3>Room Name</h3>
                    <p>Last Seen att ..</p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">

 {messages.map((message) => {
    <div>
    <p
    className= {`chat_message ${message.received && "chat_receiver"}`}
    >
        <span className="chat_name"> {message.name}</span>
        {message.message}
        <span className ="chat_timestamp"> {message.timestamp}</span>
    </p>
    
    </div>
 })}


            </div >

            <div className="chat_footer">
                <InsertEmoticon />
                <form>
                    <input value ={input} 
                    onchange = {(e) => setInput(e.target.value)} 
                    placeholder="Type a message" type="text" />
                    <button  onClick ={sendMessage}type="submit"> Send a message</button>
                </form>
                <MicIcon />
            </div>

        </div >
    )
}

export default Chat;