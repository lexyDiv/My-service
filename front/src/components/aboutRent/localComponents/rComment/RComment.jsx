import React from "react";

const RComment = function({ comment }) {
    return (
        <div style={{ color: 'white' }}>
          {comment.value}
        </div>
    )
}

export default RComment;