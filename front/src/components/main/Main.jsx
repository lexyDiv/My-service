import React, { useEffect, useRef } from "react";
import ReactPlayer from 'react-player'
import { useSelector } from "react-redux";

const image = new Image();
image.src = '/prosto.mp4'

const Main = function() {

    const { wHeight, wWidth } = useSelector(store => store.windowHeight);
    const { main } = useSelector(store => store.main);

   const canvasRef = useRef(null);

   const videoElement = React.useMemo(() => {
    const element = document.createElement("video");
    element.src = '/prosto.mp4';
    return element;
  }, []);



//    useEffect(() => {
//     let interval = null;
//         if (canvasRef.current) {
//             console.log(image.naturalHeight)
//             const canvas = canvasRef.current;
//             const ctx = canvas.getContext('2d');
//             if (!interval && videoElement) {
//               canvasRef.current.click();
//               videoElement.play()
//                 interval = setInterval(() => {
//                     ctx.drawImage(videoElement, 0, 0 , videoElement.videoWidth, videoElement.videoHeight, 0, 0, canvas.width, canvas.height);
//                 }, 30);
//             }
//             console.log(videoElement)
//         }
//    }, [wHeight, wWidth, canvasRef]);


    return (
        <div style={{
             display: 'flex',
             position: 'absolute',
             top: '75px',
            // color: 'white',
             width: '100%',
            // height: '100%'
            flexDirection: 'column'
        }}>

{/* <video width="100%"
// height="100%"
  controls >
      <source src="/prosto.mp4" type="video/mp4"/>
     </video> */}

            {/* <ReactPlayer 
             width={'100%'}
            //  height={'100%'}
            style={{ 
               backgroundColor: 'red',
             }}
            playing={true}
            url='/prosto.mp4' />

            <ReactPlayer 
             width={'100%'}
            //  height={'100%'}
            style={{ 
               backgroundColor: 'red',
             }}
            playing={true}
            url='/prosto.mp4' /> */}
{/* <canvas id="canvas" ref={canvasRef} width={wWidth} height={wHeight}/> */}




        </div>
    )
}

export default Main