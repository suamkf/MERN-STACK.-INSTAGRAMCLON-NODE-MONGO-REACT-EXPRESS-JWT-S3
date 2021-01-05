import React, { useState, useEffect } from "react";
import Main from "../Components/Main";
import Axios from "axios";
import { Link } from "react-router-dom";
import Like from "../Components/Like";
import Loading from "../Components/loading";
import Avatar from "../Components/Avatar";
import ImagenPost from "../Components/ImagenPost";
import AddComments from "../Components/AddComments";
import NotFound from "../Components/NotFound";
import Caption from "../Components/Caption";
import { addLike, removeLike, postComment } from "../Helpers/PostHelper";

export default function PostId({ showError, match }) {
  const [loading, setLoading] = useState(true);
  const [post, setfeeds] = useState(null);
  const [postNotExist, setPostNotExist] = useState(false);

  useEffect(() => {
    async function getPost() {
      try {
        console.log(match.params.id);
        // postNotExist(false)
        const { data: post } = await Axios.get(`/api/posts/${match.params.id}`);
        setLoading(false);
        setfeeds(post);
      } catch (error) {
         if (error.response.status === 404 || error.response.status === 400) {
          setPostNotExist(true);
        } else {
          showError(
            "Huno un error al cargar el posto. Por favor intenta nuevamente"
          );
        }
        setLoading(false);
      }
    }
    getPost();
  }, []);

  function refreshPost(postAnteior, postActualizado) {
    setfeeds(postActualizado);
  }

  function refreshComments(comentariosActualizado, idPost) {
    setfeeds({
        ...post,
        comentarios: [...post.comentarios, comentariosActualizado],
      });
  }

  return (
    <Main center>
      <LoadingFunction
        loading={loading}
        post={post}
        postNotExist={postNotExist}
        addLike={addLike}
        removeLike={removeLike}
        showError={showError}
        refreshPost={refreshPost}
        postComment={postComment}
        refreshComments={refreshComments}
      />
    </Main>
  );
}

function LoadingFunction({
  loading,
  post,
  postNotExist,
  addLike,
  removeLike,
  showError,
  refreshPost,
  postComment,
  refreshComments,
}) {
  if (loading) {
    return <Loading />;
  }
  if (!post) {
    return <NotFound mensaje="El Post al que intentas acceder no existe." />;
  }

  if (postNotExist) {
    return <NotFound mensaje="El Post al que intentas acceder no existe." />;
  }

  return (
    <CharPost
      post={post}
      addLike={addLike}
      removeLike={removeLike}
      showError={showError}
      refreshPost={refreshPost}
      postComment={postComment}
      refreshComments={refreshComments}
    />
  );
}

function CharPost({
  post,
  addLike,
  removeLike,
  showError,
  refreshPost,
  postComment,
  refreshComments,
}) {
  return (
    <div className="Post">
      <div className="Post__image-container">
        <ImagenPost feed={post} />
      </div>
      <div className="Post__side-bar">
        <Avatar usuario={post.usuario} />
        <div className="Post__comentarios-y-like">
          <Caption
            userName={post.usuario.userame}
            caption={post.caption}
            coments={post.comentarios}
            feedId={post._id}
            numComments={true}
            typeUL={true}
          />
          <div className="Post__like">
            <Like
              _idFeed={post._id}
              addLike={addLike}
              removeLike={removeLike}
              refreshPost={refreshPost}
              estaLike={post.estaLike}
              showError={showError}
              feed={post}
              
            />
          </div>
          <AddComments
            idPost={post._id}
            showError={showError}
            postComment={postComment}
            comments={post.comentarios}
            user={post.usuario}
            refreshComments={refreshComments}
            ownerPostId={post.usuario._id}
          />
        </div>
      </div>
    </div>
  );
}
