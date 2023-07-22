import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import PostList from './components/PostList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails';
import { useState } from 'react';

function App() {
  const [subreddit, setSubreddit] = useState('reactjs')

  const handleSubredditChange = (selectedSubreddit) => {
    setSubreddit(selectedSubreddit)
  }
  return (
    <Router>
      <NavBar/>
      <Routes>
        <Route path='/' element={<PostList/>}/>
        <Route path='/post/:postId' element={<PostDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
