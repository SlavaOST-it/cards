import React, {ChangeEvent, useState} from 'react';
import style from './Profile.module.css'
import pencilLogo from '../../assets/img/icons/pencil.png'
import arrowLogo from "../../assets/img/icons/arrow.png"
import photoAppLogo from "../../assets/img/icons/photoapparat.png"
import {changeNameThunkCreator} from "./profile-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {logoutThunkCreator} from "../login/auth-reducer";
import {Button, TextField} from "@mui/material";
import customAvatar from "./../../assets/img/icons/avatar_user.png";


export const Profile = () => {
    const userName = useAppSelector(state => state.profile.name)
    const userEmail = useAppSelector(state => state.profile.email)
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const loggedIn = useAppSelector(state => state.login.loggedIn)
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
        }
        if (e.currentTarget.value.length > 20) {
            setError('Max length 20 symbol')
        } else {
            setError(null)
        }
    }

    const changeAvatar = () => {
        alert('change photo')
    }
    const logOutBtn = () => {
        dispatch(logoutThunkCreator())
    }
    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.profilePage}>
            <div className={style.back}>
                <NavLink to={PATH.packList} className={style.backLink}>
                    <img src={arrowLogo} alt={'back'}/>
                    Back to Packs List
                </NavLink>
            </div>
            <div className={style.profile}>
                <h2>Personal Information</h2>
                <div className={style.profile_userAvatar}>
                    <img
                        className={style.profile_userAvatar_photo}
                        src={userAvatar === null ? customAvatar : userAvatar}
                        alt={'user avatar'}/>
                    <button className={style.viewBtn}>
                        <img
                            className={style.profile_changeAvatar}
                            src={photoAppLogo}
                            alt={'change'}
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
                            <TextField
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
                <Button
                    variant={'contained'}
                    color={'primary'}
                    onClick={logOutBtn}
                >
                    Log out
                </Button>
            </div>
        </div>
    );
};
