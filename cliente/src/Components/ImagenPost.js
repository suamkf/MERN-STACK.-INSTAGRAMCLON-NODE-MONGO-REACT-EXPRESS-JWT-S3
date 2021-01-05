import React, { useSatate } from "react";
import Main from "./Main";

export default function Avatar({ feed }) {
  return (
    <img src={feed.url} alt={feed.caption} className="Post-Componente__img" />
  );
}
