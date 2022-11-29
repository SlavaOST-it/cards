import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../app/hooks";
import {BasicModal} from "../BasicModal";
import s from "../addPackModal/AddPackModal.module.css";
import {Button, Checkbox, TextField} from "@mui/material";
import {changePackStatusAC} from "../../../../features/cards/packsList-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120,
    background: 'red'
}

type DeletePackModalType = {
    active: boolean
    setActive: (active: boolean) => void
    onSaveCallback: ()=>void
}
export const DeletePackModal: FC<DeletePackModalType> = ({active, setActive, onSaveCallback}) => {
    const dispatch = useAppDispatch()
    const packName = useAppSelector(state => state.packList.cardPacks.find(el => el.name))

    // const onCancelHandler = () => {
    //     dispatch(changePackStatusAC(false))
    // }

    const onCloseHandler = () => {
        setActive(false)
    }
    return (
        <BasicModal active={active} setActive={onCloseHandler} onSaveCallback={onSaveCallback} nameButton={"Delete"}
                    title={"Delete Pack"} styleButton={styleButtonMUI}>
            <div>
                Do you really want to remove <>{packName}</>?
                All cards will be deleted.
            </div>
        </BasicModal>
    );
};