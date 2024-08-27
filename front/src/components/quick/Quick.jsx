import React from "react";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import './Quick.css';

const Quick = function() {

 const localPage = 'quick';
    
    return (
        <div id="quick">
      <ScrollContainer
     //  contCallBack={constCallBack}
      // scrollLevel={scrollLevel}
       localPage={localPage}
       />
        </div>
    )
}

export default Quick;