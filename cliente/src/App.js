import React, { useState, useEffect } from "react";
import Axios from "axios";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import {
  setToken,
  deletToken,
  initAxiosInterceptors,
  getToken,
} from "./Helpers/authHelpers";
import Nav from "./Components/Nav";
import SingUp from "./Views/SingUp";
import SingIn from "./Views/SingIn";

import Main from "./Components/Main";
import Erro from "./Components/Erro";
import Upload from "./Views/Upload";
import Loading from "./Components/loading";
import Feed from "./Views/feed";
import Profile from "./Views/Profile";
import PosId from "./Views/PostId";
import Explore from "./Views/Explore";

initAxiosInterceptors();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [erro, setErro] = useState(null);
  const [followState, setFollowState] = useState(false);

  useEffect(() => {
    async function loadingUserInfo() {
      let token = getToken();

      if (!token) {
        setLoadingUser(false);
        return;
      }
      try {
        const { data: userInfo } = await Axios.get("/api/usuarios/whoami");
        setUser(userInfo);
        setLoadingUser(false);
      } catch (error) {
        console.log(error);
      }
    }

    loadingUserInfo();
  }, []);

  async function singUp(userData) {
    // console.log(userData);
    const { data } = await Axios.post("api/usuarios/signup", userData);

    setUser(data.usuario);
    setToken(data.token);
  }

  async function singIn(email, password) {
    const { data } = await Axios.post("api/usuarios/login", {
      email,
      password,
    });
    setUser(data.usuario);
    setToken(data.token);
    //console.log(data.usuario);
  }

  async function uploadImage(file, config) {
    const { data } = await Axios.post("/api/posts/upload", file, config);

    return data;
  }

  async function sendPost(body) {
    await Axios.post("/api/posts", body);
  }

  function logOut() {
    setUser(null);
    deletToken();
  }

  let cont = 0;

  function refershNav(user) {
    setUser({ ...user, state: true });
    cont++;
  }

  function showError(mensaje) {
    setErro(mensaje);
  }

  function hideErr() {
    setErro(null);
  }

  async function getUserInfor() {
    const { data } = await Axios.get("/api/usuarios/whoami");
    console.log("data", data);
    return data;
  }
  async function getNot(id) {
    const not = await Axios.get(`api/notifications/${id}/all`);
    console.log("not", not);
    return not;
  }
 async  function getNotificatins() {
  
   
      const userInfomation = await getUserInfor();
      const retorno = await getNot(userInfomation._id);
      console.log("getNotificatins", userInfomation, retorno);
  
     
   
    return retorno;
  }
  if (loadingUser) {
    return (
      <Main center={true}>
        <Loading />
      </Main>
    );
  }

  return (
    <Router>
      <Nav
        user={user}
        refershNav={refershNav}
        cont={cont}
        getNotificatins={getNotificatins}
      />
      ;
      <Erro erro={erro} hideErr={hideErr} />
      {user ? (
        <LogInRoute
          showError={showError}
          uploadImage={uploadImage}
          sendPost={sendPost}
          user={user}
          logOut={logOut}
        />
      ) : (
        <LogOutRoute singIn={singIn} singUp={singUp} showError={showError} />
      )}
    </Router>
  );
}

function LogInRoute({ showError, uploadImage, sendPost, user, logOut }) {
  return (
    <Switch>
      <Route
        path="/upload"
        render={(props) => (
          <Upload
            {...props}
            showError={showError}
            uploadImage={uploadImage}
            sendPost={sendPost}
          />
        )}
      />
      <Route
        path="/post/:id"
        render={(props) => <PosId {...props} showError={showError} />}
      />
      <Route
        path="/showProfile/:username"
        render={(props) => (
          <Profile
            {...props}
            showError={showError}
            userId={user._id}
            logOut={logOut}
          />
        )}
      />
      <Route
        path="/explore"
        render={(props) => <Explore {...props} showError={showError} />}
      />
      <Route
        path="/"
        render={(props) => <Feed {...props} showError={showError} />}
        default
      />
    </Switch>
  );
}

function LogOutRoute({ singIn, singUp, showError }) {
  return (
    <Switch>
      <Route
        path="/singIn"
        render={(props) => (
          <SingIn {...props} singIn={singIn} showError={showError} />
        )}
      />

      <Route
        render={(props) => (
          <SingUp {...props} singUp={singUp} showError={showError} />
        )}
        default
      />
    </Switch>
  );
}
