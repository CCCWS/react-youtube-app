import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Subscribe.css";

function Subscribe(props) {
  const userTo = props.userTo;
  const userFrom = props.userFrom;
  const [number, setNumber] = useState("");
  const [subscribe, setSubscribe] = useState(false);
  let subData = {
    userTo: userTo,
    userFrom: userFrom,
  };

  useEffect(() => {
    axios.post("/api/subscribe/susbscribeNumber", subData).then((response) => {
      if (response.data.success) {
        // console.log(response);
        setNumber(response.data.susbscribeNumber);
      } else {
        alert("실패");
      }
    });

    //구독 여부 확인
    axios.post("/api/subscribe/subscribed", subData).then((response) => {
      if (response.data.success) {
        // console.log(response);
        setSubscribe(response.data.subcribed);
      } else {
        alert("실패");
      }
    });
  }, []);

  const onClick = () => {
    //이미 구독 중이면
    if (subscribe) {
      axios.post("/api/subscribe/unSubscribe", subData).then((response) => {
        if (response.data.success) {
          console.log(response);
          setNumber(number - 1);
          setSubscribe(!subscribe);
        } else {
          alert("실패");
        }
      });

      // 아직 구독을 안했다면
    } else {
      axios.post("/api/subscribe/subscribe", subData).then((response) => {
        if (response.data.success) {
          console.log(response);
          setNumber(number + 1);
          setSubscribe(!subscribe);
        } else {
          alert("실패");
        }
      });
    }
  };
  return (
    <div>
      {userTo == userFrom ? null : (
        <button
          className={subscribe ? "subscribed" : "subscribe"}
          onClick={onClick}
        >
          {number}
          {subscribe ? "구독중" : "구독"}
        </button>
      )}
    </div>
  );
}

export default Subscribe;
