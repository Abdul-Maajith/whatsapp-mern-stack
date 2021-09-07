import React from 'react'
import '../App.css';
import {IconButton, Avatar} from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from './SidebarChat';

const Sidebar = () => {
    return (
      <div className="sidebar">
        <div className="side_header">
          <Avatar src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg" />
          <div className="sidebar_headerRight">
            <IconButton>
              <DonutLargeIcon />
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
            <SearchOutlinedIcon />
            <input
              type="text"
              placeholder="Search or Start a new chat.."
              className="searchInput"
            />
          </div>
        </div>

        <div className="sidebar_chats">
          <SidebarChat />
          <SidebarChat />
          <SidebarChat />
        </div>
      </div>
    );
}

export default Sidebar
