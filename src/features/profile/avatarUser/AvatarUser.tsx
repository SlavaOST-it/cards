import React, {FC} from 'react';
import {useAppSelector} from "../../../utils/hooks/hooks";
import customAvatar from "../../../assets/img/icons/avatar_user.png";

import photoAppLogo from "../../../assets/img/icons/photoapparat.png";
import {useAppSelector} from "../../../utils/hooks/hooks";


export const AvatarUser = () => {
    const userAvatar = useAppSelector(state => state.profile.avatar)

    return (
        <div>
            <img
                className={className ? className : ""}
                src={userAvatar === null ? customAvatar : userAvatar}
                alt={'user avatar'}/>
        </div>
    );
};