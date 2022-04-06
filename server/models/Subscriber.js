const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriberSchema = mongoose.Schema(
  {
    userTo: {
      //영상 올린 유저
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    userFrom: {
      //구독자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true } //생성일 표시
);
const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = { Subscriber };
