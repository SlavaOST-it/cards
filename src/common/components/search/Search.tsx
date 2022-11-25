import style from "../../../features/cards/PacksList.module.css";
import {InputAdornment, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import React, {ChangeEvent, useEffect, useState} from 'react';
import {useAppDispatch, useDebounce} from "../../../app/hooks";
import {setSearchAC} from "../../../features/cards/packsList-reducer";

export const SearchEngine = () => {
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 700)
    const dispatch =useAppDispatch()

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }

    useEffect(() => {
        dispatch(setSearchAC(debouncedValue))
    }, [debouncedValue])

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


