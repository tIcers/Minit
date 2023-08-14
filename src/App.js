import NavBar from './components/NavBar';
import PostList from './components/PostList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails';
import { useState } from 'react';
import './App.css'

function App() {
  const [subreddit, setSubreddit] = useState("reactjs");
  const [isDarkMode, setIsDarkMode] = useState(false)

  const handleSubredditChange = (searchInput) => {
    setSubreddit(searchInput);
  };
  return (
    <Router>
      <NavBar onSubredditChange={handleSubredditChange} isDarkMode={isDarkMode}/>
      <Routes>
        <Route path='/' element={<PostList subreddit={subreddit}/>}/>
        <Route path='/post/:postId' element={<PostDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
