import React, {ChangeEvent, useState} from 'react';
import s from './Profile.module.css'
import pencilLogo from '../../assets/img/icons/pencil.png'
import {changeNameThunkCreator} from "./profile-reducer";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {LogOutButton} from "../../common/components/buttons/logOutButton/LogOutButton";
import {BackToPacksList} from "../../common/components/backToPacksLink/BackToPacksList";
import {AvatarUser} from "./avatarUser/AvatarUser";


export const Profile = () => {
    const userName = useAppSelector(state => state.profile.name)
    const userEmail = useAppSelector(state => state.profile.email)
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

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.profilePage}>

            <BackToPacksList/>

            <div className={s.profile}>
                <h2>Personal Information</h2>

                <AvatarUser/>

                <div className={s.name}>
                    {editMode
                        ? (<div>
                            <input
                                type='text'
                                className={s.input_name}
                                autoFocus={true}
                                onBlur={activateViewMode}
                                value={name}
                                onChange={changeStatus}
                            />
                            {error && (<div className={s.errorSpan}>{error}</div>)}
                        </div>)
                        : (<div>
                        <span
                            className={s.span_name}
                            onDoubleClick={activateEditMode}
                        >
                            {userName}
                            <img src={pencilLogo} alt={'change name'}/>
                        </span>
                        </div>)}
                </div>

                <div className={s.email}> {userEmail} </div>

                <LogOutButton/>
            </div>
        </div>
    );
};