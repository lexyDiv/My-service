import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { videoFileOnChange } from "./videoFileOnChange";

export function useVideoArr({
  setUpdateMessage,
  setDeletedVideos,
  setMessageColor,
}) {
  const { main } = useSelector((store) => store.main);
  const [video, setVideo] = useState(
    main.video ? { url: main.video, file: null } : null
  );
  const [video2, setVideo2] = useState(
    main.video2 ? { url: main.video2, file: null } : null
  );
  const [video3, setVideo3] = useState(
    main.video3 ? { url: main.video3, file: null } : null
  );
  const [video4, setVideo4] = useState(
    main.video4 ? { url: main.video4, file: null } : null
  );

  const videoRef = useRef(null);
  const video2Ref = useRef(null);
  const video3Ref = useRef(null);
  const video4Ref = useRef(null);

  const arr = [
    {
      videoState: video,
      mainKey: "video",
      dataRef: videoRef,
      setVideoFile: setVideo,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo,
        setUpdateMessage,
        setDeletedVideos,
        main,
        mainKey: "video",
        setMessageColor,
      }),
    },
    {
      videoState: video2,
      mainKey: "video2",
      dataRef: video2Ref,
      setVideoFile: setVideo2,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo2,
        setUpdateMessage,
        setDeletedVideos,
        main,
        mainKey: "video2",
        setMessageColor,
      }),
    },
    {
      videoState: video3,
      mainKey: "video3",
      dataRef: video3Ref,
      setVideoFile: setVideo3,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo3,
        setUpdateMessage,
        setDeletedVideos,
        main,
        mainKey: "video3",
        setMessageColor,
      }),
    },
    {
      videoState: video4,
      mainKey: "video4",
      dataRef: video4Ref,
      setVideoFile: setVideo4,
      onChangeCB: videoFileOnChange({
        setVideoFile: setVideo4,
        setUpdateMessage,
        setDeletedVideos,
        main,
        mainKey: "video4",
        setMessageColor,
      }),
    },
  ];

  return arr;
}
