import React, { useRef, useState } from "react";
import "./AddFile.css";

const AddFile = function ({ onChangeCB, fileRef, titleCB }) {
  return (
    <div className="add-file">
      <div
        onClick={() => fileRef.current && fileRef.current.click()}
        className="add-file-btn"
      >
        {titleCB()}
      </div>

      <input
        ref={fileRef}
        className="add-file-btn-input"
        type="file"
        onChange={(e) => {
          onChangeCB(e);
        }}
      />
    </div>
  );
};

export default AddFile;
