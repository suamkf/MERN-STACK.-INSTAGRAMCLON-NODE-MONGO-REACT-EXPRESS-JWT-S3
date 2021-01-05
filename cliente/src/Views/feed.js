import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../Components/loading";
import Main from "../Components/Main";
import Post from "./Post";
import ShowMorePost from "../Components/ShowMorePost";
import {addLike , removeLike,postComment} from '../Helpers/PostHelper'

export default function Feed({ showError }) {
  const [loadingFeeds, setloadingFeeds] = useState(true);
  const [feeds, setfeeds] = useState([]);
  const [lastPostDate, setlastPostDate] = useState(null);
  const [loadingNewPost, setLoadingNewPost] = useState(false);

  useEffect(() => {
    async function getFeeds() {
      const query = lastPostDate ? `?fecha=${lastPostDate}` : "";
      setlastPostDate(null);
      try {
        const { data: nuevosPosts } = await Axios.get(`api/posts/feed${query}`);
        setloadingFeeds(false);
        if (nuevosPosts.length > 0) {
          setfeeds(nuevosPosts);
          setlastPostDate(nuevosPosts[nuevosPosts.length - 1].fecha_creado);
        }
      } catch (err) {
        setloadingFeeds(false);
        showError(err);
      }
    }

    getFeeds();
  }, []);

  function refreshPost(postAnteior, postActualizado) {
    setfeeds((feeds) => {
      let postActualizados = feeds.map((feed) => {
        if (feed === postAnteior) {
          return postActualizado;
        }
        return feed;
      });

      return postActualizados;
    });
  }

  function refreshComments(comentariosActualizado, idPost) {
    setfeeds((feeds) => {
      let postActualizados = feeds.map((feed) => {
        if (feed._id === idPost) {
          const newFeed = {
            ...feed,
            comentarios: [...feed.comentarios, comentariosActualizado],
          };
          return newFeed;
        }
        return feed;
      });

      return postActualizados;
    });
  }

  function refreshtMorePost(posts) {
    if (loadingNewPost) {
      return;
    }

    setLoadingNewPost(true);
    setfeeds((feeds) => [...feeds, ...posts]);
    setLoadingNewPost(false);
    return posts[posts.length - 1].fecha_creado;
  }

  return (
    <Main true>
      <LoadInfo
        loadingFeeds={loadingFeeds}
        feeds={feeds}
        refreshPost={refreshPost}
        refreshComments={refreshComments}
        lastPostDate={lastPostDate}
        refreshtMorePost={refreshtMorePost}
        addLike={addLike}
        removeLike={removeLike}
        postComment={postComment}
      />
    </Main>
  );
}


/*async function postComment(_id, message) {
  const retornoMensaje = await Axios.post(`/api/posts/${_id}/comentarios`, {
    mensaje: message,
  });
  const retorno = retornoMensaje.data;
  return retorno;
}
*/
async function get3MorePost(lastPostDate) {
  const query = lastPostDate ? `?fecha=${lastPostDate}` : "";
  const { data: nuevosPosts } = await Axios.get(`api/posts/feed${query}`);

  return nuevosPosts;
}

function LoadInfo({
  loadingFeeds,
  feeds,
  showError,
  refreshPost,
  refreshComments,
  lastPostDate,
  refreshtMorePost,
  addLike,
  removeLike,
  postComment

}) {
  if (loadingFeeds) {
    return (
      <Main true>
        <Loading />
      </Main>
    );
  }

  if (feeds.length === 0 && !loadingFeeds) {
    return (
      <Main>
        <div className="NoSiguesANadie">
          <p className="NoSiguesANadie__mensaje">
            Tu Feed esta vacio por que no sigues a nadie, o por que no han
            posteado fotos.
          </p>
          <div className="text-center">
            <Link to="/explore" className="NoSiguesANadie__boton">
              Explora Intercambiagram
            </Link>
          </div>
        </div>
      </Main>
    );
  }

  return (
    <Main true>
      {feeds.map((feed) => (
        <Post
          key={feed._id}
          feed={feed}
          showError={showError}
          addLike={addLike}
          removeLike={removeLike}
          refreshPost={refreshPost}
          postComment={postComment}
          refreshComments={refreshComments}
          lastPostDate={lastPostDate}
        />
      ))}
      <ShowMorePost
        refreshtMorePost={refreshtMorePost}
        lastPostDate={lastPostDate}
        get3MorePost={get3MorePost}
      />
    </Main>
  );
}
