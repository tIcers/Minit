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
  return (
    <div style={searchContainerStyles}>
      <input 
        type="text"
        placeholder="Search Topic"
        onChange={handleChange}
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
  backgroundColor: "#f2f2f2",
  borderRadius: "20px",
  padding: "4px",
  width: "300px",
  margin:'auto',
  marginRight:'450px'
}

const inputStyles = {
  border:'none',
  outline:'none',
  marginLeft:'1px',
  width:'100%',
  height:'30px'
}

const searchIconStyles = {
  marginLeft:'8px',
  color:'gray',
  fontSize:'24px'
}

export default SearchBar
