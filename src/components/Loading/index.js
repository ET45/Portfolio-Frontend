import React from "react";
import Spinner from "react-bootstrap/Spinner";
import "./spinner.css";
import loading from "./loading.jpg";

export default function Loading() {
  return (
    <div className="loading_spinner">
      <span className="sr-only">
        <img src={loading} alt="load" />
      </span>
    </div>
  );
}
