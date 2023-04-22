import React, {useState} from 'react'
import axios from 'axios';

const Input = ({number,id}) => {
  const [text, setText] = useState("");
  const conversation_id = `${id}${number}`;

  const handleSend =async ( ) => {
    // search update array in firebase docs
    try {
      await axios.post('http://localhost:5000/api/admin/sendMessage',
      {
        from_number:121212,
        to_number:number,
        message_text:text,
        conversation_id
      });
    } catch (error) {
      console.log(error);
    }

    setText("");
  }
  return (
    <div className='input'>
        <input type="text" placeholder='Type Something...' onChange={e=>setText(e.target.value)} value={text}/>
        <div className="send">
            <button onClick={handleSend}>Send</button>
        </div>
    </div>
  )
}

export default Input