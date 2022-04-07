const express = require("express");
const app = express.Router();
const { Subscriber } = require("./models/Subscriber");

app.post("/susbscribeNumber", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo }).exec((err, subscribe) => {
    //subscribe에는 userTo를 구독하는 모든 케이스 포함
    if (err) return res.status(400).send(err);
    res.status(200).json({ success: true, susbscribeNumber: subscribe.length }); //subscribe에는 유저 한명한명 객체로 들어있어 길이로 전달
  });
});

app.post("/subscribed", (req, res) => {
  Subscriber.find({ userTo: req.body.userTo, userFrom: req.body.userFrom }) //userTo와 userFrom이 둘다 포함이라면 이 영상은 사용자가 구독중
    .exec((err, subscribe) => {
      if (err) return res.status(400).send(err);
      let result = false;
      if (subscribe.length !== 0) {
        //length가 1이면 구독중 > true
        result = true;
      }
      res.status(200).json({ success: true, subcribed: result });
    });
});

app.post("/unSubscribe", (req, res) => {
  Subscriber.findOneAndDelete({
    userTo: req.body.userTo,
    userFrom: req.body.userFrom,
  }).exec((err, data) => {
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true, data });
  });
});

app.post("/subscribe", (req, res) => {
  const subscribe = new Subscriber(req.body);

  subscribe.save((err, data) => {
    //불러온 모든 정보, userTo, userFrom 저장
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

module.exports = app;
