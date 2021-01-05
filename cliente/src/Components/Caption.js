import React from "react";
import { Link } from "react-router-dom";

export default function Caption({ caption, coments, userName , feedId, numComments,typeUL}) {
  return (
   
    <ul className={ typeUL ? "Post__comentarios" : "Post-Componente__acciones-ul"  }>
      <li className="Post-Componente__acciones-li">
        <Link to={`/perfil/${userName}`}>
          <b>{userName}</b>
        </Link>{" "}
        {caption}
      </li>
      <ChargeComents coments={coments} feedId={feedId} numComments={numComments}/>
    </ul>
  );
}

export function ChargeComents({ coments,feedId ,numComments}) {
  console.log(numComments)
  if (coments.length > 3 && numComments===undefined) {
    return (
      <>
        <CargarComent coment={coments[0]} />
        <CargarComent coment={coments[1]} />
       
        <Link to={`/post/${feedId}`}>
         <p  className="text-grey-dark"> Hay {coments.length-3} comenarios para que veas!!</p>
         <p></p>
        </Link>

        <CargarComent coment={coments[2]} />
      </>
    );
  }
  if (coments.length === 0) {
    return (
      <li className="Post-Componente__acciones-li">No hay comentarios aun.</li>
    );
  }

  return (
    <>
      {coments.map((coment) => (
        <CargarComent key={coment._id} coment={coment} />
      ))}
    </>
  );
}

export function CargarComent({ coment }) {
  return (
    <li className="Post-Componente__acciones-li">
      <Link to={`/perfil/${coment.usuario.username}`}>
        <b>{coment.usuario.username}</b>
      </Link>{" "}
      {coment.mensaje}
    </li>
  );
}
