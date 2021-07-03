import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js'
import React, {useEffect , useState} from "react";
import axios from './axios';
// import axios from 'axios';
// import { AllInbox } from '@material-ui/icons';
function App() {

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('./messages/sync').then(response => {
      setMessages(response.data);
    });
  } , []);
useEffect(() =>{
  // once
  const pusher = new Pusher('a14802f19e725b820a21', {
    cluster: 'ap2'
  });

  const channel = pusher.subscribe('messages');
  channel.bind('inserted', (newMessage) => {
    // alert(JSON.stringify(newMessage));
    setMessages([...messages, newMessage]);
  });
   return ()=>{
    channel.unbind_all();
    channel.unsubscribe();
  }

} , [messages]);

console.log(messages);
  return (
    <div className="app">
      <div className="app_body">
      <Sidebar />
      <Chat messages ={messages}/>
      </div>
    </div>
  );
}

export default App;
