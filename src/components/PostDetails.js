import { FaArrowDown, FaArrowUp, FaComment } from "react-icons/fa";
import { useLocation, useSearchParams} from "react-router-dom";

const PostDetails = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const postContent = searchParams.get('postContent')
  const upvotes = searchParams.get('upvotes')
  const numOfComments = searchParams.get('numOfComments')

  return (
    <div>
      <h2 >Post Details:</h2>
      {postContent ? (
        <div style = {cardStyle}>
        <p>{postContent}</p>
        <div style={voteStyles}>
          <FaArrowUp style={arrowStyle}/>
            {upvotes}
          <FaArrowDown style={arrowStyle}/>
          <FaComment style={commentIconStyle}/>
            {numOfComments}
        </div>
    </div>
    ) : (
      <p> NO content available.</p>
    )}
    </div>
  )
}

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
