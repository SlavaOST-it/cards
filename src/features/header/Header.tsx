import React from 'react';
import {useAppSelector} from "../../app/hooks";
import incubatorLogo from "../../assets/img/icons/incubator_logo.png"
import s from './Header.module.css'
import {Avatar, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import avatarUser from "../../assets/img/icons/avatar_user.png"



export const Header = () => {
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const userName = useAppSelector(state => state.profile.name)
    const userAvatar = useAppSelector(state => state.profile.avatar)

    return (
        <div className={s.header}>
            <div className={s.headerWrapper}>
                <a href="https://it-incubator.io/" target="_blank" className={s.logo} rel="noreferrer">
                    <img src={incubatorLogo} alt="incubatorLogo" />
                </a>

                {loggedIn ? (
                    <div className={s.userInfo}>
                        <a className={s.userName}>{userName}</a>
                        <Stack direction="row" spacing={2}>
                            <Avatar
                                sx={{ width: 36, height: 36 }}
                                alt={'User Name'}
                                src={userAvatar === null ? avatarUser : userAvatar}
                            />
                        </Stack>
                    </div>
                ) : (
                    <Link to={PATH.login} className={s.signInButtonLink}>
                        <Button type="submit" variant="contained" style={{ borderRadius: '20px' }}>
                            Sign In
                        </Button>
                    </Link>
                )}
            </div>
        </div>
    )
};
