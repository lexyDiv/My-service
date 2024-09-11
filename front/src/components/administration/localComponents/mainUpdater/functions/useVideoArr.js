import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { videoFileOnChange } from "./videoFileOnChange";

export function useVideoArr({ setUpdateMessage }) {
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

      return [
        {
          videoState: video,
          dataRef: videoRef,
          onChangeCB: videoFileOnChange({
            setVideoFile: setVideo,
            setUpdateMessage,
          }),
        },
        {
          videoState: video2,
          dataRef: video2Ref,
          onChangeCB: videoFileOnChange({
            setVideoFile: setVideo2,
            setUpdateMessage,
          }),
        },
        {
          videoState: video3,
          dataRef: video3Ref,
          onChangeCB: videoFileOnChange({
            setVideoFile: setVideo3,
            setUpdateMessage,
          }),
        },
        {
          videoState: video4,
          dataRef: video4Ref,
          onChangeCB: videoFileOnChange({
            setVideoFile: setVideo4,
            setUpdateMessage,
          }),
        },
      ];
}