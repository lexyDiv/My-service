import React, { useState } from "react";
import "./NewsCreator.css";
import News from "../news/News";

const NewsCreator = function () {
  const [news, setNews] = useState([
    {
      type: "text",
      color: "white",
      text: "Cactus spines are produced from specialized structures called areoles, a kind of highly reduced branch. Areoles are an identifying feature of cacti. As well as spines, areoles give rise to flowers, which are usually tubular and multipetaled. Many cacti have short growing seasons and long dormancies and are able to react quickly to any rainfall, helped by an extensive but relatively shallow root system that quickly absorbs any water reaching the ground surface. Cactus stems are often ribbed or fluted with a number of ribs which corresponds to a number in the Fibonacci numbers",
      tegName: "p",
    },
    {
        type: "image",
        tegName: 'img',
        path: '/ass.png'
    }
  ]);

  return (
    <>
      <News news={news} />
      <div id="news-creator">this is news creator</div>
    </>
  );
};

export default NewsCreator;
