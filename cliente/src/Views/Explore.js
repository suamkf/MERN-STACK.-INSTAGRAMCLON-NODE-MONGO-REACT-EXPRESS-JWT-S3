import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Main from "../Components/Main";
import Loading from "../Components/loading";
import Axios from "axios";
import { ReturnAvatarImage } from "../Components/Avatar";
import NotFound from "../Components/NotFound";
import Grid from "../Components/Grid";

export default function Explore({ showError }) {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState(null);
  const [users, setUsers] = useState(null);
  const [errorFromDB, setErrorFromDB] = useState(false);
  const [action , setAction] = useState(false)
  const [allUsers, setAllUsers] = useState([])
  


  useEffect(() => {

    async function chargeExploreInfor() {
      try {
        setLoading(true);
        const [postsFromDB, usersFromDB, allUsersFromDB] = await Promise.all([
          Axios.get("/api/posts/explore").then(({ data }) => data),
          Axios.get("/api/usuarios/explore").then(({ data }) => data),
          Axios.get("/api/usuarios/").then(({ data }) => data),
        ]);
        setPosts(postsFromDB);
        setUsers(usersFromDB);
        setAllUsers(allUsersFromDB)
        setErrorFromDB(false);
        setAction(false)
        setLoading(false);
      } catch (error) {
        showError(
          "Ocurrio un error al intentar cargar la información de explore"
        );
        setLoading(false);
        setErrorFromDB(true);
        setAction(false)
      }
    }
    if (!action){
      chargeExploreInfor();
      setAction(true)
    }
    
  }, []);
  if (loading) {
    return (
      <Main center>
        <Loading />
      </Main>
    );
  }
  if (errorFromDB) {
    return (
      <NotFound mensaje="Ups ha ocurrido un error por favor intenta cargar nuevamente o ve al inicio." />
    );
  }

  return (
    <Main>
      <div className="Explore__section">
        <h2 className="Explore__title">Descubrir usuarios</h2>
        <div className="Explore__usuarios-container">
          
          {users.map((user) => {
            
            return (
              <div className="Explore__usuario" key={user._id}>
                
                <ReturnAvatarImage usuario={user} />
                <p>{user.username}</p>
                <Link to={`/showProfile/${user.username}`}>Ver perfil</Link>
              </div>
              
            );

          })}
        </div>
      </div>
      <div className="Explore__section">
        <h2 className="Explore__title">Explorar</h2>
        <Grid posts={posts} users={allUsers} />
      </div>
    </Main>
  );
}
