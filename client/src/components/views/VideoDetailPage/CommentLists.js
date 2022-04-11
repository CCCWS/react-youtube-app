import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Comment, Avatar, Button, Input } from "antd";
import "./CommentLists.css";
import LikeDisLike from "./LikeDisLike";

const { TextArea } = Input;

function CommentLists(props) {
  const user = useSelector((state) => state.user); // 리덕스 스토어에서 유저정보를 가져옴
  const videoId = useParams().videoId; //현재 주소에 있는 비디오 아이디를 가져옴

  const [openComment, setOpenComment] = useState(false);
  const [inComment, setInCommnet] = useState("");

  const inCommentChange = (event) => {
    setInCommnet(event.target.value);
  };

  const onClickOpenComment = () => {
    setOpenComment(!openComment);
  };

  const onSubmitIn = (event) => {
    event.preventDefault();
    let commnetData = {
      comment: inComment,
      writer: user.userData._id, //리덕스에서 가져오는 방법
      //writer: localStorage.getItem('userId') //로컬스토리지에서 가져오는 방법
      videoId: videoId,
      responseTo: props.comment._id, //댓글이 어느 댓글의 추가 댓글인지
    };

    if (!localStorage.getItem("userId")) {
      alert("로그인이 필요합니다");
    } else {
      if (inComment == "") {
        alert("내용을 입력해주세요");
      } else {
        axios.post("/api/comment/saveComment", commnetData).then((response) => {
          if (response.data.success) {
            console.log(response);
            props.updateComment(response.data.result);
          } else {
            alert("실패");
          }
        });
        setInCommnet("");
        setOpenComment(false);
      }
    }
  };
  const action = [
    <LikeDisLike
      userId={localStorage.getItem("userId")}
      commentId={props.comment._id}
    />,
    <span
      style={{ marginLeft: "30px" }}
      onClick={onClickOpenComment}
      key="commentInComment"
    >
      추가 댓글
    </span>,
  ];

  const onDelete = () => {
    let commnetData = {
      comment: inComment,
      writer: user.userData._id,
      videoId: videoId,
      // responseTo: props.comment._id,
    };
    if (window.confirm("댓글 삭제?")) {
      axios.post("/api/comment/delComment ", commnetData).then((response) => {
        if (response.data.success) {
          console.log(response.data);
        } else {
          alert("실패");
        }
      });
      alert("삭제됨");
    }
  };

  return (
    <div>
      <div className="comment">
        <Comment
          actions={action}
          author={props.comment.writer.name}
          avatar={<Avatar sre={props.comment.writer.image} alt={"avatar"} />}
          content={<p>{props.comment.comment}</p>}
        />

        {props.comment.writer._id == localStorage.getItem("userId") ? (
          <button onClick={onDelete}>X</button>
        ) : null}
      </div>
      {openComment && (
        <form className="commentInInput" onSubmit={onSubmitIn}>
          <TextArea
            className="commentInInputBox"
            onChange={inCommentChange}
            value={inComment}
            placeholder="댓글 입력"
          ></TextArea>
          <Button className="commentInButton" onClick={onSubmitIn}>
            작성
          </Button>
        </form>
      )}
    </div>
  );
}

export default CommentLists;
