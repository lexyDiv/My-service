import React from "react";
import './News.css';
import { GetNewsArea } from "./localComponents/GetNewsArea";

const News = function({ news }) {
    return (
        <div className="news-body">
           {news.map((el, i) => <GetNewsArea key={i + "hz"} data={el}/>)}
        </div>
    )
}

export default News;