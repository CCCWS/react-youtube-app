const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      //덧글 작성자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    videoId: {
      //덧글 작성된 비디오 정보
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    responseTo: {
      //추가 덧글 작성자
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      //덧글 내용
      type: String,
    },
  },
  { timestamp: true } //생성일 표시
);
const Comment = mongoose.model("Comment", commentSchema);

module.exports = { Comment };
