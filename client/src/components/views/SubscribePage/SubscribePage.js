import React, { useEffect, useState } from "react";
import { Card, Avatar, Col, Typography, Row } from "antd";
import moment from "moment";
import axios from "axios";
import "./SubscribePage.css";

function SubscribePage() {
  // const test = useParams().Main;
  // console.log(test);

  const { Meta } = Card;

  const [Videos, setVideos] = useState([]);

  let subData = { userFrom: localStorage.getItem("userId") }; // 로그인된 유저의 정보를 전송

  useEffect(() => {
    axios.post("/api/video/getSubscribeVideo", subData)
    .then((response) => {
      if (response.data.success) {
        console.log(response.data);
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
        <h1> 구독 영상 </h1>
        <hr />

        <Row gutter={16}>{renderImage}</Row>
      </div>
    </div>
  );
}

export default SubscribePage;
