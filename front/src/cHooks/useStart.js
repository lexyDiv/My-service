/* eslint-disable react-hooks/exhaustive-deps */

const { useEffect } = require("react");

const useStart = function({dispatch, setStart})
{
    useEffect(() => {
     // navigate('/');
        fetch("/usersmclife")
        .then(res => res.json())
        .then(data => {
          console.log(data);
         if(data.user)
         {
           dispatch({ type: "GET_USER", payload: data.user }); 
           dispatch({ type: "GET_LOCATIONS", payload: data.locations }); 
           dispatch({ type: "SET_MAIN", payload: data.main });
         }
         dispatch({type: "SET_LOADING", payload: false});
         setStart(true);
        })
        .catch(err => {
          console.log(err);
          dispatch({type: "SET_LOADING", payload: false});
          setStart(true);
        })
     }, []);
}

export default useStart;