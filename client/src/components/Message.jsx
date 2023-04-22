import React, { useEffect, useRef } from 'react'

import userImage from '../img/user.png';
const Message = ({message, number}) => {
  const ref = useRef();
  useEffect(()=>{
    ref.current?.scrollIntoView({behavior:"smooth"});
  },[message]);
  return (
    <div ref={ref} className={`message ${message.to_number === `91${number}` && 'owner'}`}>
      {/* as of right now we have just message class but for dynamic we want message to change as the current class will we used to display message for send and receieve purposes */}
      <div className="messageInfo">
    <img src={userImage} alt="" />
    {/* <span>{message.send_datetime}</span> */}
      </div>
      <div className="messageContent">
    <p>{message.message_text}</p>

      </div>
    </div>
  )
}

export default Message