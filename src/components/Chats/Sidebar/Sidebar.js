import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';

function Sidebar() {
  const [chats, setChats] = useState([]);
  const user = { photoUrl: '132' };
  const addChat = () => {
    const chatName = prompt('Please enter a chat name');
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <button
          onClick={() => {}}
          className="sidebar__avatar"
          src={user.photoUrl}
        />
        <div className="sidebar__input">
          <div className="sidebar__searchIcon" />
          <input placeholder="search" type="text" />
        </div>
        <button className="sidebar__inputButton" variant="outlined">
          <div onClick={addChat} />
        </button>
      </div>
      <div className="sidebar__chats">
        {chats.map(({ id, data: { chatName } }) => (
          <SidebarChat key={id} id={id} chatName={chatName} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
