import React, { useState } from "react";

export default function AddComments({
  showError,
  postComment,
  idPost,
  refreshComments,
  comments,
  user,
  ownerPostId,
}) {
  const [comment, setComment] = useState("");
  const [postingComment, setpostingComment] = useState(false);
  function postComent(e) {
    e.preventDefault();
    if (postingComment) {
      return;
    }

    setpostingComment(true);

    postComment(idPost, comment,ownerPostId)
      .then((returnComment) => {
        console.log(returnComment);
        const comentariosActualizado = {
          ...returnComment,
          usuario: user,
        };
        console.log(comentariosActualizado);

        refreshComments(comentariosActualizado, idPost);
         
        setpostingComment(false);
        setComment('')
      })

      .catch((error) => {
        setpostingComment(false);
         showError(error);
        console.log(error);
      });
  }
  return (
    <form className="Post__comentario-form-container" onSubmit={postComent}>
      <input
        type="text"
        required
        maxLength="180"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Deja un comentario..."
      ></input>
      <button action="submit">Post</button>
    </form>
  );
}
