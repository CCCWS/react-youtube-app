const express = require("express");
const app = express.Router();
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

const { Video } = require("./models/Video");
const { Subscriber } = require("./models/Subscriber");

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4") {
      return cb(res.status(400).end("only mp4"), false);
    }
    cb(null, true);
  },
});

let upload = multer({ storage: storage }).single("file");

app.post("/uploadfile", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.post("/uploadVideo", (req, res) => {
  //DB에 비디오 정보 저장
  const video = new Video(req.body); //UploadPage에서 보낸 videoData의 내용이 모두 body에 담김

  video.save((err, video) => {
    // mongoDB 함수, DB에 저장
    if (err) return res.status(400).json({ success: false, err });
    res.status(200).json({ success: true });
  });
});

app.get("/getVideo", (req, res) => {
  //비디오 정보를 DB에서 가져와 클라이언트에 전송
  Video.find()
    .populate("writer") //해주지 않으면 id만 가져옴
    .exec((err, video) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, video });
    });
});

app.post("/getVideoDetail", (req, res) => {
  //id를 받아서 id와 일치하는 비디오 정보를 가져옴
  Video.findOne({ _id: req.body.videoId })
    .populate("writer")
    .exec((err, videoDetail) => {
      if (err) return res.status(400).status(err);
      res.status(200).json({ success: true, videoDetail });
    });
});

app.post("/getSubscribeVideo", (req, res) => {
  //로그인된 아이디로 구독한 유저 탐색
  Subscriber.find({ userFrom: req.body.userFrom }).exec(
    (err, subscriberInfo) => {
      //info에 db에 저장되있는 userFrom의 구독 정보가 들어감
      if (err) return res.status(400).send(err);

      let subscriberUser = [];
      subscriberInfo.map((data, index) => {
        subscriberUser.push(data.userTo); //userFrom이 구독한 여러 userTo를 배열로 집어넣음
      });

      //subscriberUser에 있는 유저의 비디오를 전송
      Video.find({ writer: { $in: subscriberUser } }) //$in > mongoDB함수, subscriberUser에 있는 모든 유저를 찾음
        .populate("writer") // writer의 모든 정보를 받음
        .exec((err, video) => {
          if (err) return res.status(400).send(err);
          res.status(200).json({ success: true, video });
        });
    }
  );
});

app.post("/thumbnail", (req, res) => {
  //썹네일 생성, 비디오 정보 가져옴

  let thumbsFilePath = "";
  let fileDuration = "";

  //비디오 정보 가져옴
  ffmpeg.ffprobe(req.body.filePath, function (err, metadata) {
    console.log(metadata);
    console.log("재생시간", metadata.format.duration);
    fileDuration = metadata.format.duration;
  });

  //썸네일 생성
  ffmpeg(req.body.filePath) // 파일이 저장된 경로
    .on("filenames", function (filenames) {
      console.log("파일명 : " + filenames.join(", "));
      thumbsFilePath = "uploads/" + filenames[0];
    }) // 파일 갯수만큼 이름 출력

    .on("end", function () {
      //썸네일 생성후
      console.log("생성 성공");
      return res.json({
        success: true,
        thumbsFilePath: thumbsFilePath,
        fileDuration: fileDuration,
      });
    })
    .screenshots({
      //생성될 썸네일 설정
      count: 1, //3개의 썸네일 생성
      folder: "uploads/", //저장 경로
      size: "320x240",
      filename: "thumbnail-%b.png",
    });
});

module.exports = app;
