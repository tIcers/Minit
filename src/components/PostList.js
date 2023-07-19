import React from "react";
import {FaComment, FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { Link } from "react-router-dom";

const PostList = () => {
  const posts =[
    {id:1, title:'First Post', image:'First image', author:'Atsuki', time:'7 hours ago', numOfComments:'669', upvotes:'43k'},
    {id:2, title:'Second Post', image:'Second image', author:'Hikaru', time:'8 hours ago', numOfComments:'390', upvotes:'6.7k'},
    {id:3, title:'Third Post', image:'Third image', author:'Atsuki2', time:'3 hours ago', numOfComments:'112', upvotes:'1.2k'},
    {id:4, title:'Forth Post', image:'Forth image', author:'Hikaru2', time:'4 hours ago', numOfComments:'900', upvotes:'9k'},
  ]
  return (
    <div>
    {posts.map((post)=> (
      <div key={post.id} style={cardStyle}>
          <Link to={`/post/${post.id}`} style={linkStyles}>
            <h2>{post.title}</h2>
          </Link>
      <h5 style={titleStyles}>
             <div style={upvotesDownvotesStyles}><FaArrowUp/>{post.upvotes}<FaArrowDown/></div>
        {post.title}
      </h5>
      <p>{post.image}</p>
      <p style={postInfoStyles}>
            Posted by: {post.author} | {post.time} |<FaComment/> {post.numOfComments}
      </p>
      </div>
    ))}
    </div>
  )
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
