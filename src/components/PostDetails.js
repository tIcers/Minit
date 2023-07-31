import { useState , useEffect} from "react";
import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";
import { useLocation, useSearchParams} from "react-router-dom";

const PostDetails = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const postContent = searchParams.get('postContent')
  const upvotes = searchParams.get('upvotes')
  const numOfComments = searchParams.get('numOfComments')
  const postId = searchParams.get('postId')

  const [postComments, setPostComments] = useState([])

  useEffect(() =>{
    fetchComments()
  }, [postId])


  const fetchComments = async () => {
    try {
      const response = await fetch(
        `https://www.reddit.com/r/reactjs/comments/${postId}.json`
      );
      const data = await response.json();
      console.log("API Res Data:", data)
      if (data && data[1] && data[1].data && data[1].data.children) {
        const commentData = data[1].data.children.map((child) => {
          const comment = child.data;
          return {
            id: comment.id,
            text: comment.body,
            author: comment.author,
            upvotes: comment.ups,
            time: comment.created_utc,
          };
        });
        setPostComments(commentData);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

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
              <p>Comment text: {comment.text}</p>
              <p>Author: {comment.author}</p>
              <p>Upvotes: {comment.upvotes}</p>
              <p>Time: {comment.time}</p>
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
