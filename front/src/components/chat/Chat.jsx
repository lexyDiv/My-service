import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Chat = function() {


    const dispatch = useDispatch();

    useEffect(() => {
     dispatch({type: 'FIRST', payload: [{name: 'ЧАТ', path: '/chat', id: 0}]});
    }, [dispatch]);

    return (
        <div>
            this is chat
        </div>
    )
}

export default Chat;