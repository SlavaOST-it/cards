import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../BasicModal";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import {useAppDispatch} from "../../../../app/hooks";
import {ChangePackTC} from "../../../../features/cards/packsList-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}
type EditPackModalType = {
    active: boolean
    setActive: (active:boolean)=>void
    packId:string
    name:string
}
export const EditPackModal:FC<EditPackModalType> = ({name,packId,active, setActive}) => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState(name)
    const [checkValue, setCheckValue] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(ChangePackTC(packId,value, checkValue))
        setActive(false)

    }

    const onCancelHandler = () => {
        setActive(false)
    }

    const onChangeChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setCheckValue(e.currentTarget.checked)
    }

    return (
        <BasicModal
            title={"Edit pack"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={value.length === 0}
            styleButton={styleButtonMUI}
        >
            <div>
                <TextField value={value} label="Name pack" margin="normal" fullWidth={true} placeholder={"Name pack"}
                           onChange={onChangeHandler}/>
            </div>
            <div>
                <Checkbox onChange={onChangeChecked} value={checkValue}/>Private pack
            </div>
        </BasicModal>
    );
};