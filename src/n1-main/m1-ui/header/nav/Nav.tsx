import React from 'react';
import {NavLink} from "react-router-dom";
import {
    enterNewPasswordRoute,
    loginRoute,
    passwordRecoveryRoute,
    profileRoute,
    registerRoute,
    testRoute
} from "../../routes/routes";
import style from "./Nav.module.css";

export const Nav = () => {
    return (
        <div className={""}>
            <NavLink to={loginRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                LOGIN
            </NavLink>
            <NavLink to={registerRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                REGISTRATION
            </NavLink>
            <NavLink to={profileRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                PROFILE
            </NavLink>
            <NavLink to={testRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                TEST PAGE
            </NavLink>
            <NavLink to={passwordRecoveryRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                PASSWORD RECOVERY
            </NavLink>
            <NavLink to={enterNewPasswordRoute}
                     className={({isActive}) => isActive ? style.buttonActive : style.button}>
                ENTER NEW PASSWORD
            </NavLink>
        </div>
    );
};