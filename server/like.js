const express = require("express");
const app = express.Router();
const { Like } = require("./models/Like");
const { DisLike } = require("./models/DisLike");

app.post("/getLike", (req, res) => {
  let data = {};
  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId };
  } else {
    data = { commentId: req.body.commentId };
  }
  Like.find(data) //Like에 대한 정보를 찾음
    .exec((err, like) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, like });
    });
});

app.post("/getDisLike", (req, res) => {
  let data = {};
  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId };
  } else {
    data = { commentId: req.body.commentId };
  }
  DisLike.find(data) //Like에 대한 정보를 찾음
    .exec((err, dislike) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, dislike });
    });
});

app.post("/upLike", (req, res) => {
  let data = {};

  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // like collection에 클릭한 정보를 넣음
  const like = new Like(data);
  like.save((err, likeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    // 싫어요를 누른 상태에서 좋아요를 클릭했을 경우 싫어요를 1줄임
    DisLike.findOneAndDelete(data).exec((err, disLikeResult) => {
      //data에 들어있는 Id를 찾고 있다면 삭제
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

app.post("/unLike", (req, res) => {
  let data = {};
  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  Like.findOneAndDelete(data).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, result });
  });
});

app.post("/upDisLike", (req, res) => {
  let data = {};

  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  // like collection에 클릭한 정보를 넣음
  const disLike = new DisLike(data);
  disLike.save((err, disLikeResult) => {
    if (err) return res.status(400).json({ success: false, err });

    // 싫어요를 누른 상태에서 좋아요를 클릭했을 경우 싫어요를 1줄임
    Like.findOneAndDelete(data).exec((err, likeResult) => {
      //data에 들어있는 Id를 찾고 있다면 삭제
      if (err) return res.status(400).json({ success: false, err });
      res.status(200).json({ success: true });
    });
  });
});

app.post("/unDisLike", (req, res) => {
  let data = {};
  if (req.body.videoId) {
    //데이터에 videoId가 들어갈경우
    data = { videoId: req.body.videoId, userId: req.body.userId };
  } else {
    data = { commentId: req.body.commentId, userId: req.body.userId };
  }

  DisLike.findOneAndDelete(data).exec((err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = app;
