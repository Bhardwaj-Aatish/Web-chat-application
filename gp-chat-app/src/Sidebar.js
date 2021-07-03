// ye rfce se function component aa jata hai 
// extension ki badolat 
import React from 'react'
import './Sidebar.css'
// now we are adding some icons from material.ui
// this website prove built in compoenent of react as well as icon 
// first  i have install whole package using npm install @material-ui/core
// then for using icons or installing icons npm install @material-ui/icons we have run this in terminal 
// now we can search for icons in material.ui.com website and have to import each component from there seperaately 
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
// we can take two or more component from core like avatar and iconbutton
import {Avatar,IconButton} from '@material-ui/core';
// two more icons for our build
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';

import SidebarChat from './SidebarChat.js'


function Sidebar() {
    return (
        <div className="sidebar">
            {/* <h1>I am a side baar </h1> */}
            <div className="sidebar_header">
                {/* avatar  is another  component  which can take image and show that*/}
                <IconButton>

                <Avatar src=" https://images.unsplash.com/photo-1555445091-5a8b655e8a4a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"/>
                </IconButton>
             

                <div className="siderbar_headerRight">

                {/* right header */}


                  <IconButton>
                     <DonutLargeIcon />
                      {/* now to make this icons clickable we will enclosed this in another component, IconButton also we have to import it */}
                  </IconButton>

                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    {/* search icon */}
                    <SearchIcon />
                    <input placeholder=" search any contact" type="text" />
                </div>
            </div>
            <div className="sidebar_chat">
                <SidebarChat />
                <SidebarChat />
                <SidebarChat />
            </div>
        
        </div>
    );
}

export default Sidebar;
