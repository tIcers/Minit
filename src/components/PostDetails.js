import { useState, useEffect } from "react";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";
import { useLocation, useParams } from "react-router-dom";
import { formatTime } from "./PostList";

const PostDetails = () => {
  const location = useLocation();
  const postId = location.pathname.split("/post/")[1]
  const searchParams = new URLSearchParams(location.search);
  const postContent = searchParams.get("postContent");
  const upvotes = searchParams.get("upvotes");
  const numOfComments = searchParams.get("numOfComments");

  const [postComments, setPostComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/reactjs/comments/${postId}.json`
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
      depth:depth
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
            <div key={comment.id} style={commentStyle}>
              <p style={{marginLeft: `${comment.depth * 20}px`}}>
              {comment.author} | {formatTime(comment.time)}
              </p>
              <p style={{marginLeft: `${comment.depth * 20}px`}}>
              </p>
              <p style={{marginLeft: `${comment.depth * 20}px`}}>
                {comment.text}
              </p>
              <p style={{marginLeft:`${comment.depth * 20}px`}}>
              <FaArrowUp/> {comment.upvotes}<FaArrowDown/>
              </p>
            </div>
          ))
        ) : (
          <p>No comments available.</p>
        )}
      </div>
    </div>
  );
};

const commentStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const cardStyle = {
  backgroundColor:'#f9f9f9',
  padding:'10px',
  marginBottom:'20px',
  borderRadius:'8px',
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
}

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
