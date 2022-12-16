import React from 'react';
import {logoutThunkCreator} from "../../../../features/login/auth-reducer";
import {useAppDispatch} from "../../../../utils/hooks/hooks";
import s from "./LogOutButton.module.css"

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