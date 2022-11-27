import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./addNewPackModal.module.css"
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {ChangePackTC, setPackIdAC} from "../cards/packsList-reducer";


export const EditPackModal = () => {
    const dispatch = useAppDispatch()
    const packId = useAppSelector(state => state.packList.packId)
    const [value, setValue] = useState('')
    const [checkValue, setCheckValue] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
        dispatch(ChangePackTC(packId, value,checkValue))
        dispatch(setPackIdAC(''))
    }
    const onCancelHandler = () => {
        dispatch(setPackIdAC(''))
    }
    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckValue(e.currentTarget.checked)
    }
    return (
        <div className={style.container}>
            <h3>Edit pack</h3>
            <TextField value={value} onChange={onChangeHandler}/>
            <Checkbox onChange={onChangeChecked} value={checkValue}/>
            <Button onClick={onClickHandler}>Add</Button>
            <Button onClick={onCancelHandler}>Cancel</Button>
        </div>
    );
};

