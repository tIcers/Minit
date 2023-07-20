import React from "react";

const CommentList = ({comments}) => {
  return (
    <div>
      <h3>Comments;</h3>
      {comments.map((comment,index) => (
        <div key={index}>
          <p>{comment}</p>
        </div>
      ))}
    </div>
  )
}

export default CommentList
