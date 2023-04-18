import { useState } from 'react';
import { Button } from 'antd';
import ChatDrawer from './component/chatDrawer';

const App = () => {
const [drawerVisible, setDrawerVisible] = useState(false);

const showDrawer = () => {
setDrawerVisible(true);
};

const hideDrawer = () => {
setDrawerVisible(false);
};

return (
<div>
<Button type="primary" onClick={showDrawer}>
Open chat
</Button> 
<ChatDrawer visible={drawerVisible} onClose={hideDrawer} />


</div>
);
};

export default App;