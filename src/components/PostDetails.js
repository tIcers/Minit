import React, { useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment";
import CommentList from "./CommentList";

const PostDetails = () => {
  const {postId} = useParams()
  const [comments, setComments] = useState([])

  const handleAddComment = (comment) => {
    setComments([...comments, comment])

  }
  return (
    <div>
      <h2>Post Details:</h2>
      <p>Post ID: {postId}</p>
      <AddComment onAddComment={handleAddComment}/ >
      <CommentList comments={comments}/>

    </div>
  )
}


export default PostDetails
