// ChatDrawer.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Drawer, Input, Button } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import io from 'socket.io-client';

const ChatDrawer = ({ visible, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [socket, setSocket] = useState(null);
  const quillRef = useRef(null); // Ref for the Quill editor instance

  useEffect(() => {
    // axios.get('/api/messages')
    //   .then(response => {
    //     setMessages(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // Create a Socket.IO connection
    const socket = io('http://localhost:5000');

    // Store the socket object in state
    setSocket(socket);

    // Listen for incoming messages from the server
    socket.on('message', newMessage => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      // Close the Socket.IO connection when the component unmounts
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    // Emit a 'message' event to the server with the new message
    socket.emit('message', message);

    // Reset the message input field
    setMessage('');
  };

  const handleQuillChange = (value) => {
    setMessage(value);
  };

  const handleImageUpload = (file) => {
    const formData = new FormData();
    formData.append('image', file);

    // Make a POST request to the server to upload the image
    axios.post('/api/upload', formData)
      .then(response => {
        // Get the URL of the uploaded image
        const imageUrl = response.data.imageUrl;

        // Insert the image URL into the Quill editor at the current cursor position
        const quill = quillRef.current.getEditor();
        quill.focus();
        quill.insertEmbed(quill.getSelection().index, 'image', imageUrl);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title="Chat"
      width={400}
    >
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <ReactQuill
        ref={quillRef} // Assign the ref to the Quill editor
        value={message}
        onChange={handleQuillChange}
        modules={{
          toolbar: {
            container: [
              [{ header: [1, 2, 3, false] }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['link', 'image'],
            ],
            handlers: {
              image: handleImageUpload,
            },
          },
        }}
      />
      <br />
      <Button type="primary" onClick={sendMessage}>
        Send
      </Button>
    </Drawer>
  );
};

export default ChatDrawer;
