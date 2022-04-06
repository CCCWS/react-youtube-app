import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import { useParams } from "react-router-dom";
// import { FaCode } from "react-icons/fa";
import moment from "moment";
import axios from "axios";
import "./MainPage.css";

const { Title } = Typography;
const { Meta } = Card;

function MainPage() {
  // const test = useParams().Main;
  // console.log(test);

  const [Videos, setVideos] = useState([]);

  useEffect(() => {
    axios.get("/api/video/getVideo").then((response) => {
      if (response.data.success) {
        console.log(response.data.video);
        setVideos(response.data.video);
      } else {
        alert("실패");
      }
    });
  }, []);

  const renderImage = Videos.map((video, index) => {
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor(video.duration - minutes * 60);

    return (
      <Col key={index} lg={6} md={8} xs={24}>
        <div style={{ position: "relative" }}>
          <a href={`/DetailPage/${video._id}`}>
            <img
              className="thumbnail"
              alt="thumbnail"
              src={`http://localhost:3001/${video.thumbnail}`}
            />

            <div className=" duration">
              <span>
                {minutes} : {seconds}
              </span>
            </div>
          </a>
        </div>
        <br />
        <Meta
          avatar={<Avatar src={video.writer.image} />}
          title={video.title}
        />
        <span>{video.writer.name} </span>
        <br />
        <div>
          <span style={{ marginLeft: "3rem" }}>
            {moment(video.createdAt).format("YYYY.MM.DD")}{" "}
          </span>
          <span> {video.views}회</span>
        </div>
      </Col>
    );
  });

  return (
    <div className="back">
      <div className="main">
        <h1> Recommended </h1>
        <hr />

        <Row gutter={16}>{renderImage}</Row>
      </div>
    </div>
  );
}

export default MainPage;
