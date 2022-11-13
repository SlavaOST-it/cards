import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./Nav.module.css";
import {PATH} from "../../../utils/routes/routes";


export const Nav = () => {
    const item = [
        {link: PATH.login, title: 'LOGIN'},
        {link: PATH.registration, title: 'REGISTRATION'},
        {link: PATH.profile, title: 'PROFILE'},
        {link: PATH.test, title: 'TEST PAGE'},
        {link: PATH.passwordRecovery, title: 'PASSWORD RECOVERY'},
        {link: PATH.enterNewPassword, title: 'ENTER NEW PASSWORD'},
    ]
    return (
        <div className={""}>
            <nav>
                {item.map(el =>
                    <NavLink to={el.link}
                             className={({isActive}) => isActive ? style.buttonActive : style.button}>
                        {el.title}
                    </NavLink>
                )}
            </nav>
        </div>
    );
};