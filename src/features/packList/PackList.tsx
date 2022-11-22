import React, {ChangeEvent, useState} from 'react';
import style from "./PackList.module.css"
import {Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import { Search} from "@mui/icons-material";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {packListTC} from "./packList-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export const PackList = () => {
    const dispatch=useAppDispatch()
    const dataCards=useAppSelector(state=>state.packList.cardPacks)
    const [alignment, setAlignment] =useState('My')
    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const onChangeHandler=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        dispatch(packListTC(e.currentTarget.value))
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                Packs list
                <Button sx={{borderRadius:5}}  size="small" variant="contained"> Add new pack</Button>
            </div>
            <div className={style.filtering}>
                <div className={style.search}>
                    Search
                    <TextField
                        onChange={onChangeHandler}
                        size="small"
                        id="input-with-icon-textfield"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search />
                                </InputAdornment>
                            ),
                        }}
                        variant="outlined"
                    />
                </div>
                <div className={style.showPacksCards}>
                    Show packs cards
                    <ToggleButtonGroup
                        size="small"
                        color="primary"
                        value={alignment}
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton value="web">My</ToggleButton>
                        <ToggleButton value="android">All</ToggleButton>
                    </ToggleButtonGroup>
                </div>
                <div className={style.numberOfCards}>
                    Number of cards
                    <RangeSlider/>
                    <FilterAltOffOutlinedIcon/>
                </div>
            </div>
            <div className={style.table}>
                {dataCards.map(el=>{return <div key={el._id}>{el.name}</div>})}
            </div>
        </div>
    );
};

