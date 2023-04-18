import React from 'react'
import addPhoto from '../img/gallery.png';
import attach from '../img/attachment.png'
const Input = () => {
  return (
    <div className='input'>
        <input type="text" placeholder='Type Something...' />
        <div className="send">
            <img src={attach} alt="" />
            <input type="file" id='file' style={{display:'none'}}/>
            <label htmlFor="file">
                <img src={addPhoto} alt="" />
            </label>
            <button>Send</button>
        </div>
    </div>
  )
}

export default Input