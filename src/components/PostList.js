import React, { useEffect, useState } from "react";
import {FaComment, FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { Link } from "react-router-dom";

const PostList = () => {
  const subreddit = 'reactjs'
  const [posts, setPosts] = useState([])
  useEffect(() => {
    fetchPosts()
  }, [])
  
  const fetchPosts = async() => {
    try {
      const response = await fetch(`https:www.reddit.com/r/${subreddit}.json`)
      const data = await response.json()
      if(data && data.data && data.data.children){
        const postData = data.data.children.map((child) => child.data)
        setPosts(postData)
      }
      
    } catch (error) {
      console.error('Error fetching posts:', error)
    }
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} style={cardStyle}>
          <Link to={`/post/${post.id}?postContent=${encodeURIComponent(post.content)} &upvotes=${encodeURIComponent(post.upvotes)}&numOfComments=${encodeURIComponent(post.numOfComments)}`} style={linkStyles}>
            <h2>{post.title}</h2>
          </Link>
          <h5 style={titleStyles}>
            <div style={upvotesDownvotesStyles}>
              <FaArrowUp/>{post.upvotes}<FaArrowDown/>
            </div>
            {post.title}
          </h5>
          <p>{post.image}</p>
          <p style={postInfoStyles}>
            Posted by: {post.author} | {post.time} | <FaComment/> {post.numOfComments}
          </p>
        </div>
      ))}
    </div>
  );
}

const linkStyles ={
  TextDecoration:'none',
  color:'inherit'
}

const cardStyle = {
  backgroundColor:'#f9f9f9',
  padding:'10px',
  marginBottom:'20px',
  borderRadius:'8px',
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}
const postInfoStyles = {
  marginTop:'10px'
}

const titleStyles = {
  display:'flex',
  alignItems:'center',
}

const upvotesDownvotesStyles = {
  display:'flex',
  alignItems:'center',
  marginRight:'110px'

}

export default PostList
