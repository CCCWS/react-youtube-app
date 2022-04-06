import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Subscribe.css";

function Subscribe(props) {
  const [number, setNumber] = useState("");
  const [subscribe, setSubscribe] = useState("");
  let susbscribeNumber = { userData: props.userData };
  useEffect(() => {
    axios
      .post("/api/subscribe/susbscribeNumber", susbscribeNumber)
      .then((response) => {
        if (response.data.success) {
          console.log(response);
          setNumber(response.data.susbscribeNumber);
        } else {
          alert("실패");
        }
      });

    //구독 여부 확인
    let subscribed = {
      userData: props.userData,
      userFrom: localStorage.getItem("userId"),
    };
    axios.post("/api/subscribe/subscribed", subscribed).then((response) => {
      if (response.data.success) {
        console.log(response);
        setSubscribe(response.data.setSubscribe);
      } else {
        alert("실패");
      }
    });
  }, []);

  const onClick = () => {
    setSubscribe(!subscribe);
  };
  return (
    <div>
      <button
        className={subscribe ? "subscribed" : "subscribe"}
        onClick={onClick}
      >
        {subscribe ? "구독중" : "구독"}
      </button>
    </div>
  );
}

export default Subscribe;
