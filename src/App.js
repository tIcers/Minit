import NavBar from './components/NavBar';
import PostList from './components/PostList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostDetails from './components/PostDetails';
import { useState } from 'react';

function App() {
  const [subreddit, setSubreddit] = useState('reactjs')

  const handleSubredditChange= (searchInput) => {
    setSubreddit(searchInput)
  }
  return (
    <Router>
      <NavBar onSubredditChange={handleSubredditChange} />
      <Routes>
        <Route path='/' element={<PostList subreddit={subreddit}/>}/>
        <Route path='/post/:postId' element={<PostDetails/>}/>
      </Routes>
    </Router>
  );
}

export default App;
