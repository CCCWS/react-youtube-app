import { Typography, Button, Form, message, Input } from "antd";
import React, { useState } from "react";
import "./UploadPage.css";
import Dropzone from "react-dropzone";
import { FolderAddOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const selectType = [
  { value: 0, label: "Private" },
  { value: 1, label: "Public" },
];

const setlectCategory = [
  { value: 0, label: "movie" },
  { value: 1, label: "music" },
  { value: 2, label: "game" },
  { value: 3, label: "animals" },
];

function UploadPage() {
  const user = useSelector((state) => state.user); //리덕스 스토어에 저장된 유저를 가져옴
  const [videoTitle, setVedioTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoPrivate, setVideoPrivate] = useState(0);
  const [category, setCategory] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");
  const [fileDuration, setFileDuration] = useState("");
  const [filePath, setFilePath] = useState("");
  const navigate = useNavigate();

  function titleChange(event) {
    setVedioTitle(event.target.value);
  }

  function descriptionChange(event) {
    setDescription(event.target.value);
  }

  function typeChange(event) {
    setVideoPrivate(event.target.value);
  }

  function categoryChange(event) {
    setCategory(event.target.value);
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: {
        "content-type": "multipart/form-data",
      },
    }; //파일의 타입을 지정해줘야됨

    formData.append("file", files[0]);

    Axios.post("/api/video/uploadfile", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response);

        let videoData = {
          //response에서 받은 데이터
          filePath: response.data.filePath,
          fileName: response.data.fileName,
        };

        setFilePath(response.data.filePath);

        Axios.post("/api/video/thumbnail", videoData).then((response) => {
          if (response.data.success) {
            console.log(response.data);
            setFileDuration(response.data.fileDuration);
            setThumbnailPath(response.data.thumbsFilePath);
          } else {
            alert("실패");
          }
        });
      } else {
        console.log(response);
      }
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const videoData = {
      writer: user.userData._id,
      title: videoTitle,
      description: description,
      privacy: videoPrivate,
      filePath: filePath,
      category: category,
      duration: fileDuration,
      thumbnail: thumbnailPath,
    };
    console.log("data", videoData);
    Axios.post("/api/video/uploadVideo", videoData).then((response) => {
      if (response.data.success) {
        message.success("업로드 완료");
        setTimeout(() => {
          navigate("/");
        }, 1000); //업로드 이후 1초 대기후 메인페이지로 이동
      } else {
        alert("실패");
      }
    });
  };

  return (
    <div className="test">
      <div className="uploadPage">
        <div className="Title">
          <h1>Upload Video</h1>
        </div>
        <Form onSubmit={"onSubmit"}>
          <div className="uploadVideo">
            <Dropzone onDrop={onDrop} multiple={false} maxSize={165466420}>
              {({ getRootProps, getInputProps }) => (
                <div className="dropZone" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {<FolderAddOutlined />}
                </div>
              )}
            </Dropzone>
            {thumbnailPath && (
              <div>
                <img
                  src={`http://localhost:3001/${thumbnailPath}`}
                  alt="thumbnail"
                />
              </div>
            )}
          </div>
          <br />
          <br />
          <label>Title</label>
          <Input onChange={titleChange} value={videoTitle} />
          <br />
          <br />

          <label>Description</label>
          <TextArea onChange={descriptionChange} value={description} />
          <br />
          <br />

          <select onChange={typeChange}>
            {selectType.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <br />

          <select onChange={categoryChange}>
            {setlectCategory.map((item, index) => (
              <option key={index} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>

          <br />
          <br />

          <Button type="primart" size="large" onClick={onSubmit}>
            submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default UploadPage;
