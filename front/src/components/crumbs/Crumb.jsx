import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Crumb = function({ crumb })
{

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const reLocation = function() {
    //dispatch({ type: "SELECT", payload: crumb.index });
      navigate(crumb.path);
  }
//console.log(crumb.index);
    return (
     
            <div style={{ display: 'flex'}}>
                <p className="crumb"
                onClick={reLocation}
                >{crumb.name}</p>
                
                <p style={{marginLeft: '3px'}}>{'>>'}</p>
            </div>
    )
}

export default Crumb;