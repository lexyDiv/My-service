import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ReactPlayer from 'react-player';

const TitleVideo = function({ itemSize, image, deleteCB, width }) {

    // const videoElement = React.useMemo(() => {
    //     const element = document.createElement("video");
    //     element.src = image;
    //     return element;
    //   }, [image]);


    return (
      <div
        style={{
          width: `${width ? width : "auto"}px`,
        }}
        className="title-image-contur"
      >
     <ReactPlayer 
             width={'90%'}
            //  height={'100%'}
            style={{ 
              // backgroundColor: 'red',
             }}
            playing={true}
            url='/prosto.mp4' />
  
        <DeleteIcon
          onClick={deleteCB}
          color="warning"
          sx={{
            position: "absolute",
            top: 5,
            right: 0,
            cursor: "pointer",
          }}
        />
      </div>
    );
  };

export default TitleVideo;