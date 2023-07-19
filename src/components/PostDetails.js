import React from "react";
import { useParams } from "react-router-dom";
import PostList from "./PostList";

const PostDetails = () => {
  const {postId} = useParams()

  return (
    <div>
      <h2>Post Details:</h2>
      <p>Post ID: {postId}</p>
    </div>
  )
}


export default PostDetails
