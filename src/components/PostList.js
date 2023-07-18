import React from "react";

const PostList = () => {
  const posts =[
    {id:1, title:'First Post', image:'First image', author:'Atsuki', time:'7 hours ago', numOfComments:'669'},
    {id:2, title:'Second Post', image:'Second image', author:'Hikaru', time:'8 hours ago', numOfComments:'390'},
    {id:3, title:'Third Post', image:'Third image', author:'Atsuki2', time:'3 hours ago', numOfComments:'112'},
    {id:4, title:'Forth Post', image:'Forth image', author:'Hikaru2', time:'4 hours ago', numOfComments:'900'},
  ]
  return (
    <div>
    {posts.map((post)=> (
      <div key={post.id}>
      <h2>{post.title}</h2>
      <p>{post.image}</p>
      <p style={postInfoStyles}>
            Posted by: {post.author} | {post.time} | {post.numOfComments}
      </p>
      </div>
    ))}
    </div>
  )
}

const postInfoStyles = {
  marginTop:'10px'
}

export default PostList
