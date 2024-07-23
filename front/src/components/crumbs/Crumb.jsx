import React from "react";
import { useNavigate } from "react-router-dom";

const Crumb = function({ crumb })
{

    const navigate = useNavigate();

  const reLocation = function() {
      navigate(crumb.path);
  }

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