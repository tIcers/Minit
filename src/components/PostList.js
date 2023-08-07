import React, { useEffect, useState } from "react";
import {FaComment, FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { Link } from "react-router-dom";

export const formatTime = (timeStamp) => {
    const currentDate = new Date()
    const postDate = new Date(timeStamp * 1000) // convert to milliseconds

    const timeDiff = currentDate.getTime() - postDate.getTime()
    const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))

    if(hoursDiff < 1){
      return "Less than an hour ago"
    }else if(hoursDiff ===1 ){
      return "1 hour ago"
    }else if (hoursDiff < 24){
      return `${hoursDiff} hours ago`
    }else{
      const dayDiff = Math.floor(hoursDiff / 24)
      return dayDiff === 1 ? "1 day ago" : `${dayDiff} days ago`
    }

  }

const PostList = () => {
  const subreddit = 'reactjs'
  const [posts, setPosts] = useState([])

  const maxContentLength = 200
  const [showFullContentId, setShowFullContentId] = useState(null)

  const toggleContentDisplay = (postId) => {
    setShowFullContentId((prev) => (prev === postId ? null : postId))
  }

  useEffect(() => {
    fetchPosts()
  }, [])
  
 const fetchPosts = async() => {
    try {
      const response = await fetch(`https:www.reddit.com/r/${subreddit}.json`)
      const data = await response.json()
      if(data && data.data && data.data.children){
        const postData = data.data.children.map((child) => {
        const post = child.data
        console.log("image thumbnail", post.thumbnail)
        return {
          id:post.id,
          title:post.title,
          content:post.selftext,
          image:post.thumbnail,
          author:post.author,
          time:post.created_utc,
          numOfComments:post.num_comments,
          upvotes:post.ups,
        }
      })
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
        <Link
          to={`/post/${post.id}?postContent=${encodeURIComponent(
            post.content
          )}&upvotes=${encodeURIComponent(post.upvotes)}&numOfComments=${post.numOfComments}`}
          style={linkStyles}
        >
            <div style={titleContainerStyle}>
              {post.image && post.image != 'self' && (
                <img src={post.image} alt='img' style={thumbnailStyle}/>
              )}
            <h2 style={titleStyles}>{post.title}</h2>
            </div>
          </Link>
          <h5 style={titleStyles}>
            <div style={upvotesDownvotesStyles}>
              <FaArrowUp/>{post.upvotes}<FaArrowDown/>
            </div>
          </h5>
          <p style={postInfoStyles}>
            Posted by: {post.author} | {formatTime(post.time)} | <FaComment/> {post.numOfComments}
          </p>
        </div>
      ))}
    </div>
  );
};

const titleContainerStyle = {
  display:"flex",
  alignItems:'center'
}
const thumbnailStyle = {
  width: "40px",
  height: "40px",
  marginRight: "8px",
};
const linkStyles ={
  TextDecoration:'none',
  color:'inherit'
}

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  background: "#f5f5f5", 
};
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
