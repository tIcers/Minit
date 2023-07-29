import React, { useEffect, useState } from "react";
import {FaComment, FaArrowUp, FaArrowDown} from 'react-icons/fa'
import { Link } from "react-router-dom";

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

  const formatTime = (timeStamp) => {
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
            <h2>{post.title}</h2>
          </Link>
          {post.image && post.image !== "self" ? (
            <img src={post.image} alt={post.title} style={imageStyle} />
          ) : (
            <div style={placeholderStyle}>
              {post.content.length > maxContentLength ? (
                <>
                  {showFullContentId === post.id ? (
                    post.content // Show full content
                  ) : (
                    <>
                      {`${post.content.slice(0, maxContentLength)}...`}
                      <button
                        style={{ color: "blue", textDecoration: "underline", border: "none", background: "none", cursor: "pointer" }}
                        onClick={() => toggleContentDisplay(post.id)}
                      >
                        Show more
                      </button>
                    </>
                  )}
                </>
              ) : (
                post.content
              )}
            </div>
          )}
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

const linkStyles ={
  TextDecoration:'none',
  color:'inherit'
}

const imageStyle = {
  width: '100%',
  height: 'auto',
  marginBottom: '10px',
};

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
const placeholderStyle = {
  width: '100%',
  height: '150px',
  backgroundColor: '#f3f3f3',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: '10px',
};

export default PostList
