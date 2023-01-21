import React from 'react';
import s from "./AvatarUser.module.css";
import customAvatar from "../../../assets/img/icons/avatar_user.png";
import photoAppLogo from "../../../assets/img/icons/photoapparat.png";
import {useAppSelector} from "../../../utils/hooks/hooks";


export const AvatarUser = () => {
    const userAvatar = useAppSelector(state => state.profile.avatar)

    const changeAvatarHandle = () => {
        alert('change photo')
    }

    return (
        <div className={s.profile_userAvatar}>
            <img
                className={s.profile_userAvatar_photo}
                src={userAvatar === null ? customAvatar : userAvatar}
                alt={'user avatar'}/>
            <button className={s.viewBtn}>
                <img
                    className={s.profile_changeAvatar}
                    src={photoAppLogo}
                    alt={'change'}
                    onClick={changeAvatarHandle}/>
            </button>
        </div>
    );
};