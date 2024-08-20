import React, { useRef, useState } from "react";
import "./AddFile.css";

const AddFile = function () {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const fileRef = useRef(null);

  return (
    <div id="add-file">
      <div onClick={() => fileRef.current.click()} id="add-file-btn">
        btn
      </div>
      <input
        ref={fileRef}
        id="add-file-btn-input"
        type="file"
        onChange={onImageChange}
      />
      {image && <img alt="preview" src={image} />}
    </div>
  );
};

export default AddFile;
