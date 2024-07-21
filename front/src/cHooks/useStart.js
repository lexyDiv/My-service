const { useEffect } = require("react");

const useStart = function({dispatch})
{
    useEffect(() => {
        fetch("/users")
        .then(res => res.json())
        .then(data => {
         if(data.user)
         {
           dispatch({ type: "GET_USER", payload: data.user });
         }
         dispatch({type: "SET_LOADING", payload: false});
        })
        .catch(err => console.log(err))
     }, [dispatch]);
}

export default useStart;