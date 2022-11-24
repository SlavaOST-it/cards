import * as React from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {useState} from "react";
import {setSortAC} from "../../../features/cards/packList-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

export const SelectSort = () => {
    const dispatch=useAppDispatch()
    const selected =useAppSelector(state=>state.packList.selected)
    const onclickUpHandler = () => {
        dispatch(setSortAC('0cardsCount',false))
    }
    const onclickDownHandler = () => {
        dispatch(setSortAC('1cardsCount',true))
    }
    return <div>
        {selected ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/> :
            <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
    </div>

}