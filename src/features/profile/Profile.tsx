import React, {ChangeEvent, useEffect, useState} from 'react';
import style from './Profile.module.css'
import pencilLogo from '../../assets/img/icons/pencil.png'
import arrowLogo from "../../assets/img/icons/arrow.png"
import photoAppLogo from "../../assets/img/icons/photoapparat.png"
import logoutLogo from "../../assets/img/icons/logout.png"
import SuperButton from "../../common/components/superButton/SuperButton";
import {changeNameThunkCreator} from "./profile-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {NavLink} from "react-router-dom";


export const Profile = () => {
    //const userAvatar = useAppSelector<string>(state => state.profile.data.avatar)
    const userAvatar = 'https://avatars.mds.yandex.net/i?id=30b2b93e33bf8f3b217220bde92aea6f-5333993-images-thumbs&n=13&exp=1'
    const userName = useAppSelector<string>(state => state.profile.name)
    const userEmail = useAppSelector<string>(state => state.profile.email)
    const dispatch = useAppDispatch()

    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setName] = useState<string>(userName)
    const [error, setError] = useState<string | null>(null)


    const activateEditMode = () => {
        setEditMode(true);
        setName(userName);
    }
    const activateViewMode = () => {
        setEditMode(false);
        setError(null)
        if (name.length === 0) {
            setName(userName)
        } else {
            dispatch(changeNameThunkCreator(name));
        }

    }

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        if (e.currentTarget.value.length < 1) {
            setError('Min length 1 symbol')
        } else {
            setError(null)
        }
    }

    const changeAvatar = () => {
        alert('change photo')
    }
    const logOutBtn = () => {
        // dispatch()
    }
    return (
        <div className={style.profilePage}>
            <div className={style.headerPage}>
                <div>Logo</div>
                <div className={style.headerPage_infoUser}>
                    <div className={style.headerPage_infoUser_name}>{userName}</div>
                    <img src={userAvatar} alt={'user avatar'} className={style.headerPage_infoUser_avatar}/>
                </div>
            </div>
            <div className={style.back}>
                <NavLink to={'#'} className={style.backLink}>
                    <img src={arrowLogo} alt={'back'}/>
                    Back to Packs List
                </NavLink>
            </div>
            <div className={style.profile}>
                <h2>Personal Information</h2>
                <div className={style.profile_userAvatar}>
                    <img className={style.profile_userAvatar_photo} src={userAvatar} alt={'user avatar'}/>

                    <button className={style.viewBtn}>
                        <img className={style.profile_changeAvatar} src={photoAppLogo} alt={'change'}
                             onClick={changeAvatar}/>
                    </button>

                </div>

                <div className={style.name}>
                    {!editMode
                        ? (<div>
                        <span
                            className={style.span_name}
                            onDoubleClick={activateEditMode}
                        >
                            {userName}
                            <img src={pencilLogo} alt={'change name'}/>
                        </span>

                        </div>)
                        : (<div>
                            <input
                                className={style.input_name}
                                autoFocus={true}
                                onBlur={activateViewMode}
                                value={name}
                                onChange={changeStatus}
                            />
                            {error && (<div className={style.errorSpan}>{error}</div>)}
                        </div>)}

                </div>
                <div className={style.email}>
                    {userEmail}
                </div>
                <SuperButton
                    onClick={logOutBtn}
                >
                    <img src={logoutLogo} alt={'logout'}/>
                    Log out
                </SuperButton>
            </div>
        </div>
    );
};
