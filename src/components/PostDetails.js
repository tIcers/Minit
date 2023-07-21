import React, { useState } from "react";
import { useLocation, useSearchParams} from "react-router-dom";

const PostDetails = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const postContent = searchParams.get('postContent')

  return (
    <div>
      <h2>Post Details:</h2>
      {postContent ? <p>{postContent}</p> : <p> No content Available.</p>}
    </div>
  )
}


export default PostDetails
