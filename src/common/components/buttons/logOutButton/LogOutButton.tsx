import React from 'react';
import {logoutThunkCreator} from "../../../../features/login/auth-reducer";
import s from "./LogOutButton.module.css"
import {useAppDispatch} from "../../../../utils/hooks/hooks";

export const LogOutButton = () => {
    const dispatch = useAppDispatch()

    const logOutHandle = () => {
        dispatch(logoutThunkCreator())
    }

    return (
        <button
            className={s.logOutBtn}
            onClick={logOutHandle}
        >
            Log out
        </button>
    );
};