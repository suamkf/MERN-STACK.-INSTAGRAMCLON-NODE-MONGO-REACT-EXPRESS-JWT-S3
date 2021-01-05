import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

export default function Like({
  _idFeed,
  estaLike,
  addLike,
  removeLike,
  showError,
  refreshPost,
  feed,
}) {
  const [likeState, setlikeState] = useState(estaLike);

  function ClickEvent(e) {
    e.preventDefault()
    let postActualizado = {};
  
    if (estaLike) {
      setlikeState(false);
      
      try {
        removeLike(_idFeed,feed.usuario._id);
      } catch (error) {
        console.log(error);
        showError(error);
      }

      postActualizado = {
        ...feed,
        estaLike: false,
        numLikes: feed.numLikes - 1,
      };
    } else {
      setlikeState(true);
      try {
        addLike(_idFeed,feed.usuario._id);
      } catch (error) {
        console.log(error);
        showError(error);
      }

      postActualizado = {
        ...feed,
        estaLike: true,
        numLikes: feed.numLikes + 1,
      };
    }

    refreshPost(feed, postActualizado);
  }
  return (
    <div className="Post-Componente__like-container">
      <button onClick={ClickEvent}>
        {estaLike ? (
          <FontAwesomeIcon className="text-red-dark" icon={solidHeart} />
        ) : (
          <FontAwesomeIcon icon={regularHart} />
        )}
      </button>
    </div>
  );
}
