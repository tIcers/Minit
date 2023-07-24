import React from "react"; 
import SearchBar from './SearchBar'

const NavBar = () => {
  return (
    <nav style={navStyles}>
      <div style={leftContainerStyles}>
        <div style={imageContainerStyle}>
          <img src="../../AlienBlue_Icon.png" style={imageStyle} alt="logo" />
          <span style={letterStyle}>Minit</span>
        </div>
      </div>
      <div >
        <SearchBar />
      </div>
    </nav>
  );
};

const navStyles = {
  display:'flex',
  alignItems:'center',
  justifyContent:'space-between',
  height:'60px',
  padding:'0 20px'
}
const leftContainerStyles = {
  marginRight:'auto'
}


const imageStyle = {
  height:'40px',
  width:'auto'
}

const letterStyle = {
  marginLeft:'8px',
  fontSize:'18px',
  display:'flex',
  alignItems:'center',
  color:'blue'
}
const imageContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};


export default NavBar
