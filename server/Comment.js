const express = require("express");
const app = express.Router();
const { Comment } = require("./models/Comment");

app.post("/saveComment", (req, res) => {
  const comment = new Comment(req.body); //클라이언트에서 넘겨준 정보 저장 > writer, comment, videoId
  comment.save((err, comment) => {
    //mongoDB에 저장
    if (err) return res.status(400).json({ success: false, err });
    //save 상태에서는 바로 populate 사용불가
    Comment.find({ _id: comment._id })
      .populate("writer")
      .exec((err, result) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).json({ success: true, result });
      });
  });
});

app.post("/getComment", (req, res) => {
  Comment.find({ videoId: req.body.videoId }) //비디오의 정보를 가져옴
    .populate("writer")
    .exec((err, comment) => {
      //해당 비디오의 댓글 정보를 보냄
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, comment });
    });
});


module.exports = app;
