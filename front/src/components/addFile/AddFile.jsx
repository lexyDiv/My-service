import React, { useRef, useState } from "react";
import "./AddFile.css";

const AddFile = function ({ onChangeCB, fileRef, titleCB }) {
 

  return (
    <div id="add-file">
      <div
        onClick={() => fileRef.current && fileRef.current.click()}
        id="add-file-btn"
      >
        {titleCB()}
      </div>


      <input
//       multiple 
//     accept="image/*"
//    // webkitdirectory="true"
        ref={fileRef}
        id="add-file-btn-input"
        type="file"
        onChange={
          // onImageChange
          (e) => {
            console.log("change")
          onChangeCB(e);
          }
        }
      />
   
    </div>
  );
};

export default AddFile;
