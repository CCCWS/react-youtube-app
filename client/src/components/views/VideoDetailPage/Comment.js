import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Comment.css";

function Comment() {
  const user = useSelector((state) => state.user); // 리덕스 스토어에서 유저정보를 가져옴
  const videoId = useParams().videoId; //현재 주소에 있는 비디오 아이디를 가져옴

  const [comment, setCommnet] = useState("");

  const commentChange = (event) => {
    setCommnet(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); //덧글 작성자 내용 등을 DB에 전송

    let commnetData = {
      comment: comment,
      writer: user.userData._id, //리덕스에서 가져오는 방법
      //writer: localStorage.getItem('userId') //로컬스토리지에서 가져오는 방법
      videoId: videoId,
    };
    axios.post("/api/comment/saveComment", commnetData).then((response) => {
      if (response.data.success) {
        console.log(response);
      } else {
        alert("실패");
      }
    });
    setCommnet("");
  };

  return (
    <>
      <div>
        <hr />
        <p>댓글 | 총 0개</p>
      </div>

      <form className="commentInput" onSubmit={onSubmit}>
        <textarea
          className="commentInputBox"
          onChange={commentChange}
          value={comment}
          placeholder="댓글 입력"
        ></textarea>
        <button className="commentButton" onClick={onSubmit}>
          작성
        </button>
      </form>
    </>
  );
}

export default Comment;
