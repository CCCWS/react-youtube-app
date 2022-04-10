import React, { useEffect, useState } from "react";
import CommentLists from "./CommentLists";
import "./ReplyComment.css";

function ReplyComment(props) {
  const [inCommentNumber, setInCommentNumber] = useState(0);
  const [openComment, setOpenComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    props.commentList.map((comment) => {
      if (comment.responseTo === props.parentCommentId) {
        commentNumber++;
      }
    });
    setInCommentNumber(commentNumber);
  }, [props.commentList]); //부모로부터 오는 commentList가 바뀔때마다 재실행

  const viweComment = (parentCommentId) =>
    props.commentList.map((comment, index) => (
      <>
        {comment.responseTo === parentCommentId && (
          <div className="conmmentBox">
            <CommentLists
              updateComment={props.updateComment}
              comment={comment}
              videoId={props.videoId}
            />
            <ReplyComment
              key={index}
              updateComment={props.updateComment}
              commentList={props.commentList}
              videoId={props.videoId}
              parentCommentId={comment._id}
            />
          </div>
        )}
      </>
    ));

  const onClick = () => {
    setOpenComment(!openComment);
  };

  return (
    <>
      {inCommentNumber > 0 && (
        <div>
          <p className="replyViwe" onClick={onClick}>
            {inCommentNumber}개의 추가 댓글
          </p>
        </div>
      )}
      {openComment && viweComment(props.parentCommentId)}
    </>
  );
}

export default ReplyComment;
