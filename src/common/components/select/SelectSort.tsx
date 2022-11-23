import * as React from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {useState} from "react";
import {setSortAC} from "../../../features/packList/packList-reducer";
import {useAppDispatch} from "../../../app/hooks";

export const SelectSort = () => {
    const dispatch=useAppDispatch()
    const [selected, setSelected] = useState(true)
    const onclickUpHandler = () => {
        setSelected(false)
        dispatch(setSortAC('0cardsCount'))
    }
    const onclickDownHandler = () => {
        setSelected(true)
        dispatch(setSortAC('1cardsCount'))
    }
    return <div>
        {selected ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/> :
            <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
    </div>

}