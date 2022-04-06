import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import "./DetailPage";
import SideVideo from "./SideVideo";

function DetailPage() {
  const videoId = useParams().videoId;
  const data = { videoId: videoId };
  const [videoDeatil, setVideoDetail] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", data).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("실패");
      }
    });
  }, []);

  if (videoDeatil.writer) {
    return (
      <div className="body">
        <Row>
          <Col lg={18} xs={24}>
            <div className="detail" style={{ width: "100%", padding: "10px" }}>
              <video
                style={{ width: "100%" }}
                src={`http://localhost:3001/${videoDeatil.filePath}`}
                controls
              ></video>

              <List.Item actions>
                <List.Item.Meta
                  avatar={<Avatar src={videoDeatil.writer.image} />}
                  title={`${videoDeatil.title} - ${videoDeatil.writer.name}`}
                  description={videoDeatil.description}
                />
              </List.Item>

              {/* 덧글 */}
            </div>
          </Col>
          <Col lg={6} xs={24}>
            <SideVideo />
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div>test</div>;
  }
}

export default DetailPage;
