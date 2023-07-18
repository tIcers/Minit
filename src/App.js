import logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
       <NavBar/> 
      <header className="App-header">
        <div>
          <PostList/>
        </div>
      </header>
    </div>
  );
}

export default App;
