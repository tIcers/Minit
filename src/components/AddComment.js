import React , {useState} from "react";

const AddComment = ({onAddComment}) => {
  const [comment, setComment] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onAddComment(comment)
    setComment('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={comment}
        onChange= {(e) => setComment(e.target.value)}
        placeholder="Add a comments"/>
      <button type="submit">Add Comment</button>
    </form>
  )
}

export default AddComment
