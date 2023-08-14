import React, { useState } from "react";
import ModeSwitchButton from "./ModeSwitchButton";
import SearchBar from './SearchBar'
import { Link } from "react-router-dom";

const NavBar = ({onSubredditChange, toggleTheme}) => {
  return (
    <nav style={navStyles}>
      <div style={leftContainerStyles}>
        <div style={imageContainerStyle}>
          <Link to='/' style={logoLinkStyle}>
          <img src="../../AlienBlue_Icon.png" style={imageStyle} alt="logo" />
          <span style={letterStyle}>Minit</span>
          </Link>
        </div>
      </div>
      <div style={centerContainerStyles}> {/* Updated style for centerContainer */}
        <SearchBar onSubredditChange={onSubredditChange} />
      </div>
      <div style={rightContainerStyles}></div>
      <div className='toggle-bar'>
                <label class="toggle">
                    <input type="checkbox"  onClick={toggleTheme}></input>
                    <span class="slider"></span>
                    <span class="labels" data-on='Dark' data-off="Light"></span>
                </label>
            </div>
      </nav>
  );
};
const navStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '60px',
  padding: '0 20px',
  width: '100%', // Make sure the nav takes the full width of the screen
};

const leftContainerStyles = {};

const centerContainerStyles = { // Added new style for centerContainer
  flex: 1, // Make the centerContainer take available space
  display: 'flex',
  justifyContent: 'center',
};

const rightContainerStyles = {
  marginLeft: 'auto',
};

const imageStyle = {
  height: '40px',
  width: 'auto',
};

const letterStyle = {
  marginLeft: '8px',
  fontSize: '18px',
  display: 'flex',
  alignItems: 'center',
  color: 'blue',
};

const imageContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};
const logoLinkStyle = {
  textDecoration: "none",
  color: "blue",
  display: "flex",
  alignItems: "center",
};

export default NavBar
