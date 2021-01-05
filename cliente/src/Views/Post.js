import React from "react";
import Avatar from "../Components/Avatar";
import ImagenPost from "../Components/ImagenPost";
import Like from "../Components/Like";
import Caption from "../Components/Caption";
import AddComments from "../Components/AddComments";


export default function Post({
  feed,
  showError,
  addLike,
  removeLike,
  refreshPost,
  postComment,
  refreshComments,
}) {
  
  return (
    <div className="Post-Componente">
      <Avatar usuario={feed.usuario} />
      <ImagenPost feed={feed} />
      <div className="Post-Componente__acciones">
        <Like
          _idFeed={feed._id}
          addLike={addLike}
          removeLike={removeLike}
          refreshPost={refreshPost}
          estaLike={feed.estaLike}
          showError={showError}
          feed={feed}
        />
        <p>Liked por {feed.numLikes} personas.</p>
        <Caption
          caption={feed.caption}
          coments={feed.comentarios}
          userName={feed.usuario.username}
          feedId={feed._id}
         
          
        />
        <AddComments
          idPost={feed._id}
          showError={showError}
          postComment={postComment}
          comments ={feed.comentarios}
          user={feed.usuario}
          refreshComments={refreshComments}
          ownerPostId={feed.usuario._id}
        />
       
      </div>
      
    </div>
  );
}
