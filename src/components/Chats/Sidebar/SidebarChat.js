import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './SidebarChat.css'
import * as timeago from 'timeago.js'

function SidebarChat({ id, chatName}) {
    const dispatch = useDispatch();
    const [chatInfo, setChat] = useState([])

    return (
        <div 
                className = "sidebarChat"
                onClick = { () => {
                    dispatch(
                        setChat({
                            chatId: id,
                            chatName: chatName
                        })
                    )
                }}
            >
            <div 
                src = {chatInfo[0]?.photoUrl}
            />
            <div className = "sidebarChat__info">
                <h3>
                   {chatName} 
                </h3>
            <p>{chatInfo[0]?.message}</p>
            <small>{timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}</small>
            </div>
        </div>
    )
}

export default SidebarChat
