import React from 'react'

import userImage from '../img/user.png';
const Message = ({baseClass}) => {
  return (
    <div className={baseClass}>
      {/* as of right now we have just message class but for dynamic we want message to change as the current class will we used to display message for send and receieve purposes */}
      <div className="messageInfo">
    <img src={userImage} alt="" />
    <span>just now</span>
      </div>
      <div className="messageContent">
    <p>Hello</p>
    {/* <img src={userImage} alt="" /> */}

      </div>
    </div>
  )
}

export default Message