import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {logoutThunkCreator} from "../../login/auth-reducer";
import s from "./HeaderItem.module.css";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import avatarUser from "../../../assets/img/icons/avatar_user.png";
import arrowDown from "../../../assets/img/icons/down-arrow-svgrepo-com.svg";
import {NavLink} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";


export const HeaderItem = () => {
    const dispatch = useAppDispatch()
    const userAvatar = useAppSelector(state => state.profile.avatar)
    const userName = useAppSelector(state => state.profile.name)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const open = Boolean(anchorEl);

    const onClickHandle = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const onCloseHandle = () => {
        setAnchorEl(null);
    }

    const logOutHandle = () => {
        onCloseHandle()
        dispatch(logoutThunkCreator())
    }

    return (
        <div className={s.userInfo}>
            <div className={s.userName}>{userName}</div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={onClickHandle}
            >
                <Stack direction="row" spacing={2}>
                    <Avatar
                        sx={{width: 36, height: 36}}
                        alt={'User Name'}
                        src={userAvatar === null ? avatarUser : userAvatar}
                    />

                </Stack>
                <img className={s.arrowDown} src={arrowDown} alt={'arrow menu'}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={onCloseHandle}
                MenuListProps={{
                    'aria-labelledby': 'basic-buttons',
                }}
            >
                <MenuItem onClick={onCloseHandle}>
                    <NavLink to={PATH.profile} className={s.menuLink}>
                        Profile
                    </NavLink></MenuItem>
                <MenuItem onClick={logOutHandle}>
                    Logout
                </MenuItem>
            </Menu>
        </div>
    )
};