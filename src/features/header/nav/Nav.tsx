import React from 'react';
import {NavLink} from "react-router-dom";
import style from "./Nav.module.css";
import {PATH} from "../../../utils/routes/routes";


export const Nav = () => {
    const item = [
        {link: PATH.login, title: 'LOGIN'},
        {link: PATH.registration, title: 'REGISTRATION'},
        {link: PATH.profile, title: 'PROFILE'},
        {link: PATH.passwordRecovery, title: 'PASSWORD RECOVERY'},
        {link: PATH.setNewPassword, title: 'ENTER NEW PASSWORD'},
        {link: PATH.packList, title: 'PACK LIST'},
        {link: PATH.cardList, title: 'CARD LIST'},
    ]
    return (
        <div className={""}>
            <nav>
                {item.map(el =>
                    <NavLink key={el.link} to={el.link}
                             className={({isActive}) => isActive ? style.buttonActive : style.button}>
                        {el.title}
                    </NavLink>
                )}
            </nav>
        </div>
    );
};