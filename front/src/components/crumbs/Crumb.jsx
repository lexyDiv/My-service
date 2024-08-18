import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Crumb = function({ crumb, noHover })
{

    const navigate = useNavigate();
    const dispatch = useDispatch();

  const reLocation = function() {
    //dispatch({ type: "SELECT", payload: crumb.index });
      navigate(crumb.path);
  }
//console.log(crumb.index);
    return (
     
            <div
            className="crumb-box"
             >
                <p className={!noHover ? 'crumb' : 'crumb-last'}
                onClick={() => !noHover ? reLocation() : false}
                >{crumb.name}</p>
                
                <p
                 style={{marginTop: '3px'}}
                 >{'>>'}</p>
            </div>
    )
}

export default Crumb;