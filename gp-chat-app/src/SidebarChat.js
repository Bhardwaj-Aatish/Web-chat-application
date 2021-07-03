// rfce 
import React from 'react'
import './SidebarChat.css'
import {Avatar} from '@material-ui/core'
function SidebarChat() {
    return (
        <div className="sidebarchat">
            <Avatar />
            <div className="sidebarchat_info">
                <h5>Room Name</h5>
                 <p> This is the last message</p>
            </div>
    
        </div>
    )
}

export default SidebarChat
