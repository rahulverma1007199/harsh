import './chatDrawer.scss';
import React from 'react';
import { Drawer} from 'antd';
import Messages from '../components/Messages';
import Input from '../components/Input';
import vCam from '../img/vCamera.png';
import menu from '../img/menu.png';
import addFr from '../img/addFriend.png';

const ChatDrawer = ({ visible, onClose }) => {
  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      title="Chat"
      width={400}
    >
    <div className="chat">
    <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <img src={vCam} alt="" />
          <img src={addFr} alt="" />
          <img src={menu} alt="" />
        </div>
      </div>
      <Messages/> 
      <Input/>
    </div>
    </Drawer>
  );
};

export default ChatDrawer;