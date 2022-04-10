import axios from "axios";
import React, { useEffect, useState } from "react";

import "./SideVideo.css";

function SideVideo() {
  const [sideVideo, setSideVideo] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideo").then((response) => {
      if (response.data.success) {
        // console.log(response.data.video);
        setSideVideo(response.data.video);
      } else {
        alert("실패");
      }
    });
  }, []);

  const renderSidevideo = sideVideo.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);
    return (
      <div key={index} className="sideBox">
        <div className="sideItem">
          <a href={`http://localhost:3000/DetailPage/${video._id}`}>
            <img
              className="thambnail"
              src={`http://localhost:3001/${video.thumbnail}`}
              alt="thumbnail"
            />
          </a>
        </div>
        <div className="videoInfo">
          <div className="test">
            <span className="title"> {video.title}</span>
            <span>{video.writer.name}</span>
            <span>{video.viwes}</span>
            <span>
              {minutes} : {seconds}
            </span>
          </div>
        </div>
      </div>
    );
  });

  return <React.Fragment>{renderSidevideo}</React.Fragment>;
}

export default SideVideo;
