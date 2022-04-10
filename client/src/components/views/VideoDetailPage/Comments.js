import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentLists from "./CommentLists";
import ReplyComment from "./ReplyComment";
import "./Comments.css";
import { Button, Input } from "antd";
const { TextArea } = Input;

function Comments(props) {
  const user = useSelector((state) => state.user); // 리덕스 스토어에서 유저정보를 가져옴
  const videoId = useParams().videoId; //현재 주소에 있는 비디오 아이디를 가져옴

  const [comment, setCommnet] = useState("");

  const commentChange = (event) => {
    setCommnet(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); //덧글 작성자 내용 등을 DB에 전송
    if (localStorage.getItem("userId")) {
      let commnetData = {
        comment: comment,
        writer: user.userData._id, //리덕스에서 가져오는 방법
        //writer: localStorage.getItem('userId') //로컬스토리지에서 가져오는 방법
        videoId: videoId,
      };
      axios.post("/api/comment/saveComment", commnetData).then((response) => {
        if (response.data.success) {
          props.updateComment(response.data.result); //props로 받은 함수에 결과값을 넘겨줌
        } else {
          alert("실패");
        }
      });
      setCommnet("");
    } else {
      alert("로그인이 필요합니다");
    }
  };
  const commentLength = props.commentList.length;

  return (
    <>
      <div>
        <hr />
        <p>댓글 | 총 {commentLength}개</p>
      </div>

      <form className="commentInput" onSubmit={onSubmit}>
        <TextArea
          className="commentInputBox"
          onChange={commentChange}
          value={comment}
          placeholder="댓글 입력"
        ></TextArea>
        <Button className="commentButton" onClick={onSubmit}>
          작성
        </Button>
      </form>

      {props.commentList &&
        props.commentList.map(
          (comment, index) =>
            !comment.responseTo && (
              <div key={index}>
                <CommentLists
                  comment={comment}
                  videoId={videoId}
                  updateComment={props.updateComment}
                />
                <ReplyComment
                  updateComment={props.updateComment}
                  commentList={props.commentList}
                  parentCommentId={comment._id}
                  videoId={videoId}
                />
              </div>
            )
        )}
    </>
  );
}

export default Comments;
