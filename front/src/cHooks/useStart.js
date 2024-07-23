const { useEffect } = require("react");

const useStart = function({dispatch, setStart})
{
    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => {
          console.log(data);
         if(data.user)
         {
           dispatch({ type: "GET_USER", payload: data.user }); 
          // console.log("locations = ", data.locations);
           dispatch({ type: "GET_LOCATIONS", payload: data.locations }); 
         }
         dispatch({type: "SET_LOADING", payload: false});
         setStart(true);
        })
        .catch(err => {
          console.log(err);
          dispatch({type: "SET_LOADING", payload: false});
          setStart(true);
        })
     }, [dispatch]);
}

export default useStart;