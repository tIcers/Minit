import React, { useEffect, useState } from "react";
import {FaComment, FaArrowUp, FaArrowDown, FaPen} from 'react-icons/fa'
import { Link } from "react-router-dom";
import '../load.css'

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

const PostList = ({subreddit}) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [subreddit])
  
const fetchPosts = async () => {
  try {
    setLoading(true);
    const searchQuery = encodeURIComponent(`subreddit:${subreddit}`);
    const sort = 'new';
    const limit = 25; 

    const response = await fetch(
      `https://www.reddit.com/search.json?q=${searchQuery}&sort=${sort}&limit=${limit}`
    );
    const data = await response.json();
    if (data && data.data && data.data.children) {
      const postData = data.data.children.map((child) => {
        const post = child.data;
        console.log("image thumbnail", post.thumbnail);
        return {
          id: post.id,
          title: post.title,
          content: post.selftext,
          image: post.thumbnail,
          author: post.author,
          time: post.created_utc,
          numOfComments: post.num_comments,
          upvotes: post.ups,
        };
      });
      setPosts(postData);
      setLoading(false);
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    setLoading(false);
  }
};


  return (
    <div>
      {loading ? (
        <div style={loadingContainerStyles}>
          <div className="loader"></div>
        </div>
      ) : (
        posts.map((post) => (
          <div key={post.id} style={cardStyle}>
            <p style={subredditStyle}>r/{subreddit}</p>
            <Link
              to={`/post/${post.id}?subreddit=${subreddit}&postContent=${encodeURIComponent(
                post.content
              )}&upvotes=${encodeURIComponent(post.upvotes)}&numOfComments=${post.numOfComments}`}
              style={linkStyles}
            >
              <div style={titleContainerStyle}>
                {post.image && post.image !== "self" ? (
                  <img src={post.image} alt="" style={imageStyle} />
                ) : (
                  <FaPen />
                )}
                <h2 style={titleStyles}>{post.title}</h2>
                <div style={upvotesContainerStyle}>
                  <FaArrowUp />
                  <span style={upvotesStyle}>{post.upvotes}</span>
                </div>
              </div>
            </Link>
            <p style={postInfoStyles}>
              Posted by: {post.author} | {formatTime(post.time)} |{" "}
              <FaComment /> {post.numOfComments}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

const titleContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const imageStyle = {
  height: "100px",
  width: "100px",
  marginRight: "8px",
  marginTop:'10px',
};

const upvotesContainerStyle = {
  display: "flex",
  alignItems: "center",
  background: "DarkGray", // You can change the background color of the upvotes container here
  borderRadius: "4px",
  padding: "4px 8px",
};

const upvotesStyle = {
  marginLeft: "4px",
  color: "white",
};
const linkStyles ={
  TextDecoration:'none',
  color:'inherit'
}

export const cardStyle = {
  display:'flex',
  flexDirection:'column',
  border: "1px solid #ddd",
  borderRadius: "8px",
  padding: "16px",
  margin: "16px",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  background: "#fff",
  background: "#f5f5f5", 
};
const postInfoStyles = {
  display:'flex',
  alignItems:'center',
  justifyContent:'center',
}

const titleStyles = {
  display:'flex',
  alignItems:'center',
}

const subredditStyle = {
  color:'gray',
  fontWeight:'bold'
}

const loadingContainerStyles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "200px",
};

export default PostList
