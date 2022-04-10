import React, { useEffect, useState } from "react";
import { Tooltip } from "antd";
import "./LikeDisLike.css";
import {
  LikeOutlined,
  DislikeOutlined,
  LikeFilled,
  DislikeFilled,
} from "@ant-design/icons";
import axios from "axios";

function LikeDisLike(props) {
  const [like, setLike] = useState(0);
  const [disLike, setDisLike] = useState(0);
  const [likeAction, setLikeAction] = useState(false);
  const [disLikeAction, setDisLikeAction] = useState(false);
  let data = {};

  if (props.video) {
    //부모 DetailPage로부터 받은 props가 video라면 비디오에 대한 좋아요 싫어요
    data = { videoId: props.videoId, userId: props.userId };
  } else {
    //아니라면 댓글에 대한 좋아요 싫어요
    data = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    axios.post("/api/like/getLike", data).then((response) => {
      if (response.data.success) {
        //좋아요 갯수
        console.log("좋아요수", response.data);
        setLike(response.data.like.length);
        //이미 좋아요를 눌렀는지 확인
        response.data.like.map((like) => {
          //response.data.like > 좋아요를 누른 모든 유저 리스트
          //props.userId == 현재 로그인된 유저와 좋아요를 누른 모든 유저를 하나씩 비교해서
          // 만약 같다면 그건 이미 좋아요를 누른것
          if (like.userId === props.userId) {
            setLikeAction(true);
          }
        });
      } else {
        alert("실패");
      }
    });

    axios.post("/api/like/getDisLike", data).then((response) => {
      if (response.data.success) {
        //싫어요 갯수
        console.log("싫어요수", response.data);
        setDisLike(response.data.dislike.length);
        //이미 싫어요를 눌렀는지 확인
        response.data.dislike.map((dislike) => {
          //response.data.like > 좋아요를 누른 모든 유저 리스트
          //props.userId == 현재 로그인된 유저와 좋아요를 누른 모든 유저를 하나씩 비교해서
          // 만약 같다면 그건 이미 좋아요를 누른것
          if (dislike.userId === props.userId) {
            setDisLikeAction(true);
          }
        });
      } else {
        alert("실패");
      }
    });
  }, []);

  const onLike = () => {
    if (likeAction == false) {
      //   클릭 안했을경우 > 클릭시 상승
      axios.post("/api/like/upLike", data).then((response) => {
        if (response.data.success) {
          setLike(like + 1);
          setLikeAction(!likeAction);

          if (disLikeAction == true) {
            setDisLikeAction(!disLikeAction);
            setDisLike(disLike - 1);
          }
        } else {
          alert("실패");
        }
      });
    } else {
      //좋아요가 이미 클릭되어 있을때 > 클릭시 하락
      axios.post("/api/like/unLike", data).then((response) => {
        if (response.data.success) {
          setLike(like - 1);
          setLikeAction(!likeAction);
        } else {
          alert("실패");
        }
      });
    }
  };

  const onDisLike = () => {
    if (disLikeAction == false) {
      //   클릭 안했을경우 > 클릭시 상승
      axios.post("/api/like/upDisLike", data).then((response) => {
        if (response.data.success) {
          setDisLike(disLike + 1);
          setDisLikeAction(!disLikeAction);

          if (likeAction == true) {
            setLikeAction(!likeAction);
            setLike(like - 1);
          }
        } else {
          alert("실패");
        }
      });
    } else {
      //좋아요가 이미 클릭되어 있을때 > 클릭시 하락
      axios.post("/api/like/unDisLike", data).then((response) => {
        if (response.data.success) {
          setDisLike(disLike - 1);
          setDisLikeAction(!disLikeAction);
        } else {
          alert("실패");
        }
      });
    }
  };

  return (
    <div>
      <span className="like" key="comment-basic-like">
        <Tooltip title="좋아요">
          {likeAction ? (
            <LikeFilled onClick={onLike} />
          ) : (
            <LikeOutlined onClick={onLike} />
          )}
        </Tooltip>
        <span className="likeText">{like}</span>
      </span>

      <span className="dislike" key="comment-basic-dislike">
        <Tooltip title="싫어요">
          {disLikeAction ? (
            <DislikeFilled onClick={onDisLike} />
          ) : (
            <DislikeOutlined onClick={onDisLike} />
          )}
        </Tooltip>
        <span className="likeText">{disLike}</span>
      </span>
    </div>
  );
}

export default LikeDisLike;
