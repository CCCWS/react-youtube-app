const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = mongoose.Schema(
  {
    //누가 좋아요를 눌렀는지
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    //댓글에 대한 좋아요 확인
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    //비디오에 대한 좋아요 확인
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true } //생성일 표시
);
const Like = mongoose.model("Like", likeSchema);

module.exports = { Like };
