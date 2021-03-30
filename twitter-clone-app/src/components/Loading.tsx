import React from "react";
import loading from "../assets/images/loading.gif";
const Loading = () => {
  return (
    <div
      style={{ width: "100vw", height: "100vh", background: "rgba(0,0,0,.5)" }}
      className="fixed-top d-flex align-items-center justify-content-center"
    >
      <img src={loading} alt="" />
    </div>
  );
};
export default Loading;
