import React, { useEffect, useState } from 'react'
import Message from './Message'
import axios from 'axios';

const Messages = ({number,id}) => {

  const [messages, setMessages] = useState([]);
  const conversation_id = `${id}${number}`;
  useEffect(()=>{
    const unsub =async ()=>{
      const res =await axios.post('http://localhost:5000/api/admin/userAllMessage',{conversation_id});
      setMessages(res.data);
    }

    return ()=>{
      unsub();
    }
  },[conversation_id]);
  return (
    <div className='messages'>
    {messages.map(m=>(
        <Message message={m} key={m.id} number={number}/>
      ))}
</div>
  )
}

export default Messages