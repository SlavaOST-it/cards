import React, {ChangeEvent} from 'react';
import {Pagination, Stack} from "@mui/material";
import {setPageAC} from "../../../features/packList/packList-reducer";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

 export const BasicPagination = () => {
     const dispatch=useAppDispatch()
     const cardPacksTotalCount=useAppSelector(state=>state.packList.cardPacksTotalCount)
     const pageCount=useAppSelector(state=>state.packList.pageCount)
     const onChangeHandler=(e:ChangeEvent<unknown>,page: number)=>{
        dispatch(setPageAC(page))
     }
     console.log(cardPacksTotalCount)
     const countPacks=Math.ceil(cardPacksTotalCount/pageCount)
    return (
        <Stack sx={{p:1}} spacing={2}>
            <Pagination  onChange={onChangeHandler} count={countPacks} color="primary" />
        </Stack>
    );
};
