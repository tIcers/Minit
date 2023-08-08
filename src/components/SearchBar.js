import React , {useState}from "react";
import { FaSearch } from "react-icons/fa";


const SearchBar = ({onSubredditChange}) => {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSearch = () => {
    onSubredditChange(searchInput)
  }

  const handleKeyPress = (e) => {
    if (e.key ==="Enter"){
      handleSearch()
    }
  }
  return (
    <div style={searchContainerStyles}>
      <input 
        type="text"
        placeholder="Search Subreddits"
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        value={searchInput}
        style={inputStyles}
      />
      <FaSearch style = {searchIconStyles} onClick={handleSearch}/>
    </div>
  )
}


const searchContainerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center", // Center the search bar horizontally
  backgroundColor: "#f2f2f2",
  borderRadius: "20px",
  padding: "4px",
  width: "100%", // Use relative width to adjust to available space
  maxWidth:'400px'
};

const inputStyles = {
  border:'none',
  outline:'none',
  marginLeft:'1px',
  width:'100%',
  height:'30px',
  margin:'auto'
}

const searchIconStyles = {
  marginLeft:'8px',
  color:'gray',
  fontSize:'24px'
}

export default SearchBar
