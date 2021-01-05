import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ReturnAvatarImage } from "../Components/Avatar";
import Grid from "../Components/Grid";
import Main from "../Components/Main";
import Loading from "../Components/loading";
import NotFound from "../Components/NotFound";
import Axios from "axios";
import stringToColor from "string-to-color";

export default function Perfil({ userId, match, showError, logOut }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [posts, setPosts] = useState([]);
  const [collingServer, setCollingServer] = useState(false);
  const [urlImage, seturlImage] = useState(null);

  const username = match.params.username;
  useEffect(() => {
    console.log(username);
    async function chargeUserInfoAndPost() {
      try {
        setLoading(true);

        const usersInfo = await Axios.get(`/api/usuarios/${username}`);
        setUser(usersInfo.data);
        console.log(usersInfo.data.username);
        const userPosts = await Axios.get(
          `/api/posts/usuario/${usersInfo.data._id}`
        );

        setPosts(userPosts.data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
        showError("Hubo un error al cargar el perfil.");
        console.log(error);
      }
    }
    chargeUserInfoAndPost();
  }, []);

  async function setFollow() {
    if (!collingServer) {
      setCollingServer(true);
      let refreshUser = {};
      if (user.siguiendo) {
        try {
          await Axios.delete(`/api/amistades/${user._id}/eliminar`);
          refreshUser = {
            ...user,
            siguiendo: false,
            numSeguidores: user.numSeguidores - 1,
          };
        } catch (error) {
          setCollingServer(false);
        }
      } else {
        try {
          await Axios.post(`/api/amistades/${user._id}/seguir`);
          refreshUser = {
            ...user,
            siguiendo: true,
            numSeguidores: user.numSeguidores + 1,
          };
        } catch (error) {
          setCollingServer(false);
        }
      }

      setUser(refreshUser);
      setCollingServer(false);
    }
  }

  async function uploadImagePerfil(e) {
    e.preventDefault();
    let refreshUser = {};
    const file = e.target.files[0];
    const config = {
      headers: {
        "Content-Type": file.type,
      },
    };

    try {
      setCollingServer(true);
      setLoading(true);
      const data = await Axios.post("/api/usuarios/upload", file, config);
      setLoading(false);
      setCollingServer(false);

      refreshUser = {
        ...user,
        imagen: data.data.url,
      };
      seturlImage(data.data.url);
      setUser(refreshUser);
    } catch (err) {
      setLoading(false);
      showError(err.response.data);
      console.log(err.response.data);
      setCollingServer(true);
    }
  }
  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (error) {
    return (
      <Main center>
        <NotFound mensaje="El perfil que intenta cargar no existe, por favor ve al inicio." />
      </Main>
    );
  }
  return (
    <Main center>
      {/*<div>{JSON.stringify(user)}</div>;<div>{JSON.stringify(posts)}</div>;*/}

      <div className="Perfil">
        <ButtonFollowLogOut
          user={user}
          userId={userId}
          logOut={logOut}
          setFollow={setFollow}
          uploadImagePerfil={uploadImagePerfil}
        />
      </div>
      <div className="Perfil__separador" />
      {posts.length > 0 ? <Grid posts={posts} /> : <NoHaPosteadoFotos />}
    </Main>
  );
}

export function ButtonFollowLogOut({
  user,
  userId,
  logOut,
  setFollow,
  uploadImagePerfil,
}) {
  if (user._id === userId) {
    const contenido = (
      <label
        className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
        style={{
          backgroundImage: user.imagen ? `url(${user.imagen})` : null,
          backgroundColor: stringToColor(user.username),
        }}
      >
        <input
          type="file"
          onChange={uploadImagePerfil}
          className="hidden"
          name="imagen"
        />
      </label>
    );

    return (
      <>
        <div className="Perfil__img-container">{contenido}</div>
        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{user.username}</h2>
            <button className="Perfil__boton-seguir" onClick={logOut}>
              <Link to="/">Log Out</Link>
            </button>
          </div>
          <DescripcionPerfil user={user} />
        </div>
      </>
    );
  }
  const contenido = (
    <div
      className="Perfil__img-placeholder Perfil__img-placeholder--pointer"
      style={{
        backgroundImage: user.imagen ? `url(${user.imagen})` : null,
        backgroundColor: stringToColor(user.username),
      }}
    />
  );
  if (user.siguiendo) {
    return (
      <>
        <div className="Perfil__img-container">{contenido}</div>
        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{user.username}</h2>
            <button className="Perfil__boton-seguir" onClick={setFollow}>
              No Seguir
            </button>
          </div>
          <DescripcionPerfil user={user} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="Perfil__img-container">{contenido}</div>
        <div className="Perfil__bio-container">
          <div className="Perfil__bio-heading">
            <h2 className="capitalize">{user.username}</h2>
            <button className="Perfil__boton-seguir" onClick={setFollow}>
              Seguir
            </button>
          </div>
          <DescripcionPerfil user={user} />
        </div>
      </>
    );
  }
}

function DescripcionPerfil({ user }) {
  return (
    <div className="Perfil__descripcion">
      <h2 className="Perfil__nombre">{user.nombre}</h2>
      <p>{user.bio}</p>
      <p className="Perfil__estadisticas">
        <b>{user.numSiguiendo}</b> following
        <span className="ml-4">
          <b>{user.numSeguidores}</b> followers
        </span>
      </p>
    </div>
  );
}

function NoHaPosteadoFotos() {
  return <p className="text-center">Este usuario no ha poteado fotos.</p>;
}
