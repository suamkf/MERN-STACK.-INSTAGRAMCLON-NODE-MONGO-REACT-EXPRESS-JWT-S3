import React from "react";
import { Link } from "react-router-dom";
import {AvatarForExplore} from "./Avatar";

export default function Grid({ posts, users }) {
  let columns = posts.reduce((columns, post) => {
    const lastColumn = columns[columns.length - 1];

    if (lastColumn && lastColumn.length < 3) {
      lastColumn.push(post);
    } else {
      columns.push([post]);
    }

    return columns;
  }, []);

  return (
    <div>
      {columns.map((colum, index) => {
        return (
          <div key={index} className="Grid__row">
            {colum.map((post) => (
              <GridPhoto key={post._id} post={post} users={users} />
            ))}
          </div>
        );
      })}
    </div>
  );
}

function GridPhoto({ post, users }) {
  let returnUser = {};
  function getUser() {
    users.forEach((user) => {
      if (post.usuario.username === user.username) {
        returnUser = { ...user };
      }
    });
    return returnUser;
  }

  return (
    <>
      <Link to={`/post/${post._id}`} className="Grid__post">
        <div className="NombreUsuario__explore">
          {users ? <AvatarForExplore usuario={getUser()} /> : '' }
         
          </div>
         
        <img src={post.url} alt={post.caption} className="Grid__post-img" />
      </Link>
    </>
  );
}
