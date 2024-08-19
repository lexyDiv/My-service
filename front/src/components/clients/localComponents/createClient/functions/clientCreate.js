import React, { useState, } from "react";
import { useDispatch } from "react-redux";
import { isPhoneValid } from "../../../../../functions/isPhoneValid"

export function useClientCreate({ name, about, email, tele, phone }) {
    const dispatch = useDispatch();

    return async () => {
        dispatch({ type: "SET_LOADING", payload: true });
        
    }
}