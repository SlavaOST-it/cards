import style from "../../../features/cards/PacksList.module.css";
import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector, useDebounce} from "../../../app/hooks";
import { setSearchPacksAC} from "../../../features/cards/packsList-reducer";
import {setSearchCardsAC} from "../../../features/cards/packs/card-reduser";


export type SearchType='cards'|'packs'
export type SearchEngineType={
    SearchType:SearchType,
}

export const SearchEngine = (props:SearchEngineType) => {

    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 700)
    const dispatch =useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        if(props.SearchType==='packs'){
            dispatch(setSearchPacksAC(debouncedValue))
        }
        else{
            dispatch(setSearchCardsAC(debouncedValue))
        }
    }, [debouncedValue])

    const resetSearch=()=>{

    }

    return (
        <div className={style.search}>
            Search
            <TextField
                onChange={onChangeHandler}
                value={value}
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


