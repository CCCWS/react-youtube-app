const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema(
  {
    writer: {
      type: Schema.Types.ObjectId, //작성자의 ID를 넣음, User.js의 User정보를 모두 불러옴
      ref: "User", //User에서 가져옴
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    privacy: {
      type: Number, //0 or 1
    },
    filePath: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String,
    },
    thumbnail: {
      type: String,
    },
  },
  { timestamps: true } //생성일 표시
);
const Video = mongoose.model("Video", videoSchema);

module.exports = { Video };
