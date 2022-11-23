import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./PackList.module.css"
import {Button, InputAdornment, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Search} from "@mui/icons-material";
import {packListTC, setCardsCountAC, setIsMyPacksAC, setSearchAC} from "./packList-reducer";
import {useAppDispatch, useAppSelector, useDebounce} from "../../app/hooks";
import {TablePacks} from "../table/TablePacks";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";

export const PackListFilter = () => {
    const dispatch=useAppDispatch()
    const dataCards=useAppSelector(state=>state.packList.cardPacks)
    const page = useAppSelector(state=>state.packList.page)
    const pageCount = useAppSelector(state=>state.packList.pageCount)
    const sort = useAppSelector(state=>state.packList.sort)
    const search = useAppSelector(state=>state.packList.search)
    const isMyPacks=useAppSelector(state=>state.packList.isMyPacks)
    const minCardsCount=useAppSelector(state=>state.packList.minCardsCount)
    const maxCardsCount=useAppSelector(state=>state.packList.maxCardsCount)

    const [alignment, setAlignment] =useState('All')
    const [value,setValue]=useState<string>('')
    const debouncedValue= useDebounce<string>(value,700)

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const onClickMyHandler=()=>{
        dispatch(setIsMyPacksAC(true))
    }
    const onClickAllHandler=()=>{
        dispatch(setIsMyPacksAC(false))
    }

    const onChangeHandler=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setValue(e.currentTarget.value)
    }
    const onclickResetFilterHandler=()=>{
        setValue('')
        dispatch(setIsMyPacksAC(false))
        dispatch(setCardsCountAC([0,50]))
    }


    useEffect(()=>{
        dispatch(setSearchAC(debouncedValue))
    },[debouncedValue])

    useEffect(()=>{
       dispatch(packListTC())
    },[page,pageCount, sort, search,isMyPacks,minCardsCount,maxCardsCount])

    return (
        <div className={style.container}>
            <div className={style.header}>
                Packs list
                <Button sx={{borderRadius:5}}  size="small" variant="contained"> Add new pack</Button>
            </div>


                {!dataCards.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}
            <div className={style.filtering}>
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
                        <ToggleButton  onClick={onClickMyHandler} value="My">My</ToggleButton>
                        <ToggleButton onClick={onClickAllHandler} value="All">All</ToggleButton>

                    </ToggleButtonGroup>
                </div>
                <div className={style.numberOfCards}>
                    Number of cards
                    <RangeSlider/>
                </div>
                <div className={style.button}>
                    <Button sx={{borderRadius:5,fontSize:10}}  size="small" variant="contained" onClick={onclickResetFilterHandler}>Reset</Button>
                </div>
            </div>

            <div className={style.table}>
                <TablePacks CardsPack={dataCards} />
            </div>
        </div>
    );
};

