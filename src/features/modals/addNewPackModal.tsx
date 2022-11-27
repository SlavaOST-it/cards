import React, {ChangeEvent, useState} from 'react';
import {Button, Checkbox, TextField} from "@mui/material";
import style from "./addNewPackModal.module.css"
import {useAppDispatch} from "../../app/hooks";
import {addNewPackTC, changePackStatusAC} from "../cards/packsList-reducer";


export const AddNewPackModal = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('')
    const [checkValue, setCheckValue] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const onClickHandler = () => {
            dispatch(addNewPackTC(value,checkValue))
            dispatch(changePackStatusAC(false))
    }
    const onCancelHandler =()=>{
        dispatch(changePackStatusAC(false))
    }
    const onChangeChecked=(e:ChangeEvent<HTMLInputElement>)=>{
        setCheckValue(e.currentTarget.checked)
    }
    return (
        <div className={style.container}>
            <h3>Add new pack</h3>
            <TextField value={value} onChange={onChangeHandler}/>
            <Checkbox onChange={onChangeChecked} value={checkValue}/>
            <Button onClick={onClickHandler}>Add</Button>
            <Button onClick={onCancelHandler}>Cancel</Button>
        </div>
    );
};

