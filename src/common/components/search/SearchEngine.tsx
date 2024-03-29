import style from "../../../features/cards/PacksList.module.css";
import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import React, {ChangeEvent, useEffect} from 'react';
import {setSearchPacksAC} from "../../../features/cards/packsList-reducer";
import {setSearchCardsAC} from '../../../features/cards/cards-reducer'
import {useAppDispatch, useDebounce} from "../../../utils/hooks/hooks";

export type SearchEngineType={
    value:string,
    setValue:(value:string)=>void
}

export const SearchEngine = (props:SearchEngineType) => {

    const debouncedValue = useDebounce<string>(props.value, 700)
    const dispatch =useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        props.setValue(e.currentTarget.value)
    }

    useEffect(() => {
            dispatch(setSearchPacksAC(debouncedValue))
            dispatch(setSearchCardsAC(debouncedValue))
    }, [debouncedValue])



    return (
        <div className={style.search}>
            Search
            <TextField
                onChange={onChangeHandler}
                value={props.value}
                size="small"
                id="input-with-icon-textfield"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search/>
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
            />
        </div>
    );
};


