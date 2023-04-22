import React, { useState } from 'react'
import ChatDrawer from './ChatDrawer'
import { Button } from 'antd'
import './showIndividualChatDrawer.scss';
const ShowIndividualChatDrawer = ({name,number,id}) => {
    const [drawerVisible, setDrawerVisible] = useState(false);

    const showDrawer = () => {
    setDrawerVisible(true);
    };
  
    const hideDrawer = () => {
    setDrawerVisible(false);
    };
  return (
    <div>
  <Button type="primary" onClick={showDrawer} id='chatButton'>
    Open chat
  </Button>
  <ChatDrawer visible={drawerVisible} onClose={hideDrawer} name={name} number={number} id={id}/></div>
  )
}

export default ShowIndividualChatDrawer