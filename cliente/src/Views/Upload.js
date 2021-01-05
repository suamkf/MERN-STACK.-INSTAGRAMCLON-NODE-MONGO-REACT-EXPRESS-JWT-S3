import React, { useState } from "react";
import Main from "../Components/Main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Components/loading";

export default function Upload({ history, showError, uploadImage, sendPost }) {
  const [ImageUploading, setImageUploading] = useState(null);
  const [urlImage, seturlImage] = useState(null);
  const [caption, setCaption] = useState('');
  const [posting, setPosting] = useState(null);

  async function loadImageFromServer(e) {
    e.preventDefault();

    const file = e.target.files[0];
    const config = {
      headers: {
        "Content-Type": file.type,
      },
    };

    try {
      setImageUploading(true);
      const data = await uploadImage(file, config);
    
      setImageUploading(false);
      seturlImage(data.url);
    } catch (err) {
      setImageUploading(false);
      showError(err.response.data);
      console.log(err.response.data);
    }
  }

  async function sendPosts(e) {
    e.preventDefault();

    if (posting) {
      return;
    }
    if (ImageUploading) {
      showError("Se esta cargando una imagen al servidor. Aguarda por favor");
      return;
    }

    if (!urlImage) {
      showError("Para realizar un post por favor selecciona una imagen");
    }

    try {
      setPosting(true);
      const body = {
        caption: caption,
        url: urlImage,
      };
      sendPost(body);
      setPosting(false);
      history.push("/");
    } catch (err) {
      setPosting(false);
      showError(err.response.data);
      console.log(err.response.data);
    }
  }
  return (
    <Main center={true}>
      <div className="Upload">
        <form onSubmit={sendPosts}>
          <div className="Upload__image-section">
            <CharteImputImage
              ImageUploading={ImageUploading}
              loadImageFromServer={loadImageFromServer}
              urlImage={urlImage}
            />
          </div>
          <textarea
            name="cation"
            className="Upload__caption"
            required
            maxLength="180"
            palceholder="Caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <button className="Upload__submit" action="submit">
            {" "}
            POST{" "}
          </button>
        </form>
      </div>
    </Main>
  );
}

function CharteImputImage({ ImageUploading, loadImageFromServer, urlImage }) {
  console.log("Entro");
  if (ImageUploading) {
    return <Loading />;
  } else if (urlImage) {
    return <img src={urlImage} alt="" />;
  } else {
    return (
      <label className="Upload__image-label">
        <FontAwesomeIcon icon={faUpload} />
        <span>Publica una foto</span>
        <input
          type="file"
          className="hidden"
          name="imagen"
          onChange={loadImageFromServer}
        />
      </label>
    );
  }
}
