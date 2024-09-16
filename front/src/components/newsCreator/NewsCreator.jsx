import React, { useState } from "react";
import './NewsCreator.css';

const NewsCreator = function() {

    const [news, setNews] = useState({});

    return (
        <div id="news-creator">
            this is news creator
        </div>
    )
}

export default NewsCreator;