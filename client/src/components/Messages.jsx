import React from 'react'
import Message from './Message'
const Messages = () => {
  return (
    <div className='messages'>
    <Message baseClass={'message owner'}/>
    <Message baseClass={'message'}/>
</div>
  )
}

export default Messages