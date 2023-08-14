import NavBar from './components/NavBar';
import PostList from './components/PostList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails';
import { useState } from 'react';
import './App.css'

function App() {
  const [subreddit, setSubreddit] = useState("reactjs");
  const [theme, setTheme] = useState('light')

  const [isDarkMode, setIsDarkMode] = useState(false); 
  const toogleTheme = () => {
  setTheme((current) => current === 'light'? 'dark':'light');
  setIsDarkMode((prevMode) => !prevMode);
};

  const handleSubredditChange = (searchInput) => {
    setSubreddit(searchInput);
  };
  return (
    <Router>
      <div id={theme}>
      <NavBar onSubredditChange={handleSubredditChange} toogleTheme={toogleTheme}/>
      </div>
      <Routes>
        <Route path='/' element={<PostList subreddit={subreddit}/>}/>
        <Route path='/post/:postId' element={<PostDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
