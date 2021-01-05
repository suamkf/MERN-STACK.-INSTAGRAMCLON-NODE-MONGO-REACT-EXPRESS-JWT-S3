import React, { useSatate } from "react";
import { Link } from "react-router-dom";
import stringToColor from "string-to-color";

export default function Avatar({ usuario }) {
  const style={
    backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
    backgroundColor: stringToColor(usuario.username),
  }

  return (
    <div className="Avatar">
      <div className="Avatar__img" style={style} />
      <Link to={`/showProfile/${usuario.username}`}>
        <h2>{usuario.username}</h2>
      </Link>
    </div>
  );
}

export  function AvatarForExplore({ usuario }) {
  const style={
    backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
    backgroundColor: stringToColor(usuario.username),
  }

  return (
    <div className="Avatar">
      <div className="Avatar__img" style={style} />
      <Link to={`/showProfile/${usuario.username}`}>
        <h2>{usuario.username}</h2>
      </Link>
    </div>
  );
}
export function ReturnAvatarImage({ usuario }) {
  const style={
    backgroundImage: usuario.imagen ? `url(${usuario.imagen})` : null,
    backgroundColor: stringToColor(usuario.username),
  }
  return (
    <div className="Avatar">
      <div className="Avatar__img" style={style} />
      
    </div>
  );
}
