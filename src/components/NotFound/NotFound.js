import React from "react";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>
            4<span>0</span>4
          </h1>
        </div>
        <p>Trang không tồn tại</p>
        <a href="/">Trang chủ</a>
      </div>
    </div>
  );
};
export default NotFound;
