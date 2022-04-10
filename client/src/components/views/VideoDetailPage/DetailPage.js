import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Row, Col, List, Avatar } from "antd";
import axios from "axios";
import "./DetailPage";
import SideVideo from "./SideVideo";
import Subscribe from "./Subscribe";
import Comments from "./Comments";
import LikeDisLike from "./LikeDisLike";

function DetailPage() {
  const videoId = useParams().videoId;
  const data = { videoId: videoId };
  const [videoDeatil, setVideoDetail] = useState([]);
  const [commentList, setCommentList] = useState([]);

  useEffect(() => {
    axios.post("/api/video/getVideoDetail", data).then((response) => {
      if (response.data.success) {
        // console.log(response.data);
        setVideoDetail(response.data.videoDetail);
      } else {
        alert("실패");
      }
    });

    axios
      .post("/api/comment/getComment", data) //해당 비디오에 작성된 댓글을 가져옴
      .then((response) => {
        if (response.data.success) {
          // console.log("sasdfddf", response.data.comment);
          setCommentList(response.data.comment);
        } else {
          alert("실패");
        }
      });
  }, []);

  console.log("commentList : ", commentList);
  const updateComment = (data) => {
    setCommentList(commentList.concat(data));
  };

  const test = () => {
    const list = [...commentList];
    list.reverse();
    console.log("list", list);
    setCommentList(list);
  };

  if (videoDeatil.writer) {
    return (
      <div className="body">
        <button onClick={test}>test</button>
        <Row>
          <Col lg={18} xs={24}>
            <div className="detail" style={{ width: "100%", padding: "10px" }}>
              <video
                style={{ width: "100%" }}
                src={`http://localhost:3001/${videoDeatil.filePath}`}
                controls
              />

              <List.Item
                actions={[
                  <LikeDisLike
                    video
                    userId={localStorage.getItem("userId")}
                    videoId={videoId}
                  />,
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
              <Comments
                updateComment={updateComment}
                commentList={commentList}
              />
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
