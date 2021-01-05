import React, { useState } from "react";

export default function ShowMorePost({
  refreshtMorePost,
  get3MorePost,
  lastPostDate,
}) {
  const [lasPostDateAux, setlasPostDateAux] = useState("");
  const [morePos, setMorePost] = useState(true);

  function show3MorePost() {
    if (lasPostDateAux === "") {
      setlasPostDateAux(lastPostDate);
      get3MorePost(lastPostDate)
        .then((posts) => {
          if (posts.length > 0) {
            setlasPostDateAux(refreshtMorePost(posts));
          } else {
            setMorePost(false);
          }
        })
        .catch((err) => {});
      return;
    }

    get3MorePost(lasPostDateAux)
      .then((posts) => {
        if (posts.length > 0) {
          setlasPostDateAux(refreshtMorePost(posts));
        } else {
          setMorePost(false);
        }
      })
      .catch((err) => {});
  }

  return <ChargeBotton morePos={morePos} show3MorePost={show3MorePost} />;
}

function ChargeBotton({ morePos, show3MorePost }) {
  if (morePos) {
    return (
      <button className="Fedd_cargar-mas" onClick={show3MorePost}>
        Mostrar mas historias
      </button>
    );
  }

  return (
    <button className="Fedd_cargar-mas">
      No hay mas Hisotrias para mostrar.
    </button>
  );
}
