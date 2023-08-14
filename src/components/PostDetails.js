import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { formatTime, cardStyle } from "./PostList";
import React from "react";
const PostDetails = () => {
  const location = useLocation();
  const postId = location.pathname.split("/post/")[1]
  const searchParams = new URLSearchParams(location.search);
  const postContent = decodeURIComponent(searchParams.get("postContent"));
  const upvotes = searchParams.get("upvotes");
  const numOfComments = searchParams.get("numOfComments");
  const subreddit = searchParams.get("subreddit")

  const [postComments, setPostComments] = useState([]);
  
  useEffect(() => {
    fetchComments();
  }, [subreddit, postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/${subreddit}/comments/${postId}.json`
      );
      const data = await response.json();

      // Check if comments data is available in the response
      const commentsData = data[1]?.data?.children;
      if (Array.isArray(commentsData) && commentsData.length > 0) {
        const flatternComments = flattetnCommentsTree(commentsData)
        setPostComments(flatternComments)
      } else {
        // No comments available or API response structure is different
        setPostComments([]);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
// Function to flatten the comment tree and add depth information
const flattetnCommentsTree = (comments, depth = 0 ) => {
    let flatComments = []
    for (const comment of comments){
      flatComments.push({
      id:comment.data.id,
      text:comment.data.body,
      author:comment.data.author,
      upvotes:comment.data.ups,
      time:comment.data.created_utc,
      depth:depth,
      avatar:comment.icon_image,
    })

    if (comment.data.replies && comment.data.replies.data && comment.data.replies.data.children){
      flatComments = [
        ...flatComments,
        ...flattetnCommentsTree(comment.data.replies.data.children, depth +1),
        ]
      }
    }
    return flatComments
  }
  return (
    <div>
      <h2>Post Details:</h2>
      <div style={cardStyle}>
        <p>{postContent}</p>
        <div style={voteStyles}>
          <FaArrowUp style={arrowStyle} />
          {upvotes}
          <FaArrowDown style={arrowStyle} />
          <FaComment style={commentIconStyle} />
          {numOfComments}
        </div>
      </div>

      {/* Rendering comments with the commentStyle */}
      <div>
        <h3>Comments:</h3>
{postComments.length > 0 ? (
  postComments.map((comment) => (
    <React.Fragment key={comment.id}>
      <div style={cardStyle}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {comment.avatar && (
            <img src={comment.avatar} alt={`${comment.author}'s avatar`} style={{ width: '24px', height: '24px', marginRight: '8px' }} />
          )}
          <p style={{ marginLeft: `${comment.depth * 20}px` }}>
            {comment.author} | {formatTime(comment.time)}
          </p>
        </div>
        <p style={{ marginLeft: `${comment.depth * 20}px` }}>
          {comment.text}
        </p>
        <p style={{ marginLeft:`${comment.depth * 20}px` }}>
          <FaArrowUp/> {comment.upvotes} <FaArrowDown/>
        </p>
      </div>
    </React.Fragment>
  ))
) : (
  <p>Nobody comments yet.</p>
)}
      </div>
    </div>
  );
};


const voteStyles = {
  display:'flex',
  alignItems:'center',
}

const arrowStyle = {
  marginRight:'10px',
  cursor:'pointer',
}

const commentIconStyle = {
  cursor:'pointer',
}


export default PostDetails
