import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import "./DetailPage";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";
import Comment from "./Comment";

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

              <List.Item
                actions={[
                  <Subscribe
                    userTo={videoDeatil.writer._id} //게시글 작성자의 아이디를 porps로 전달
                    userFrom={localStorage.getItem("userId")} //로컬 스토리지에서 로그인유저 아이디 props로 전달
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<Avatar src={videoDeatil.writer.image} />}
                  title={`${videoDeatil.title} - ${videoDeatil.writer.name}`}
                  description={videoDeatil.description}
                />
              </List.Item>

              {/* 덧글 */}
              <Comment />
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
