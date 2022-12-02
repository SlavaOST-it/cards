import * as React from 'react';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import MenuItem from "@mui/material/MenuItem";
import {FormControl} from "@mui/material";
import {setPageCountAC} from "../../../features/cards/packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {useState} from "react";
import {setPageCardsCountAC} from "../../../features/cards/cards-reducer";

export const SelectPage = () => {
    const dispatch=useAppDispatch()
    const pageCount =useAppSelector(state=>JSON.stringify(state.packList.pageCount))
    const [page,setPage]=useState(pageCount)

    const onChangeHandler=(e:SelectChangeEvent)=>{
        dispatch(setPageCountAC(JSON.parse(e.target.value)))
        dispatch(setPageCardsCountAC(JSON.parse(e.target.value)))
        setPage(e.target.value)

    }
    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <Select onChange={onChangeHandler} value={page} >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
                <MenuItem value={7}>7</MenuItem>
                <MenuItem value={8}>8</MenuItem>
                <MenuItem value={9}>9</MenuItem>
                <MenuItem value={10}>10</MenuItem>
            </Select >
            </FormControl>
        </div>
    )
}