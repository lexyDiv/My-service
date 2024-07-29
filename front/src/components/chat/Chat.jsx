import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import ScrollContainer from "../scrollContainer/ScrollContainer";
import NavBtn from "../navBtn/NavBtn";




const Chat = function() {

    const dispatch = useDispatch();

    useEffect(() => {
    // dispatch({type: 'FIRST', payload: [{name: 'ЧАТ', path: '/chat', id: 0}]});
    }, [dispatch]);

      const testArr = [];
  for(let i = 0; i < 300; i ++)
  {
    testArr.push('this is scroll container item');
  }

  const constCallBack = testArr.map((el, i) => <h1 key={i} >{el}</h1>);

  const cb = function() {
    console.log("i em clicked !");
  }

    return (
        <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
            <NavBtn text={'papa loh'} cb={cb}/>
            <ScrollContainer contCallBack={constCallBack}/>
        </div>
    )
}

export default Chat;