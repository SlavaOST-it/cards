import React, {ChangeEvent, useEffect, useState} from 'react';
import style from "./PackList.module.css"
import {Button, InputAdornment, styled, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Search} from "@mui/icons-material";
import {packListTC, setCardsCountAC, setIsMyPacksAC, setSearchAC} from "./packList-reducer";
import {useAppDispatch, useAppSelector, useDebounce} from "../../app/hooks";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {PATH} from "../../utils/routes/routes";
import {Navigate} from "react-router-dom";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {ActionsPack} from "./actionsPack/ActionsPack";
import {SelectSort} from "../../common/components/select/SelectSort";

export const PacksList = () => {
    const dispatch = useAppDispatch()
    const dataPacks = useAppSelector(state => state.packList.cardPacks)
    const page = useAppSelector(state => state.packList.page)
    const pageCount = useAppSelector(state => state.packList.pageCount)
    const sort = useAppSelector(state => state.packList.sort)
    const search = useAppSelector(state => state.packList.search)
    const isMyPacks = useAppSelector(state => state.packList.isMyPacks)
    const minCardsCount = useAppSelector(state => state.packList.minCardsCount)
    const maxCardsCount = useAppSelector(state => state.packList.maxCardsCount)
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)

    const [alignment, setAlignment] = useState('All')
    const [value, setValue] = useState<string>('')
    const debouncedValue = useDebounce<string>(value, 700)

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const onClickMyHandler = () => {
        dispatch(setIsMyPacksAC(true))
    }
    const onClickAllHandler = () => {
        dispatch(setIsMyPacksAC(false))
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.currentTarget.value)
    }
    const onclickResetFilterHandler = () => {
        setValue('')
        dispatch(setIsMyPacksAC(false))
        dispatch(setCardsCountAC([0, 50]))
    }


    useEffect(() => {
        dispatch(setSearchAC(debouncedValue))
    }, [debouncedValue])

    useEffect(() => {
        dispatch(packListTC())
    }, [page, pageCount, sort, search, isMyPacks, minCardsCount, maxCardsCount])


    const StyledTableCell = styled(TableCell)(({theme}) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({theme}) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0.5,
        },
    }));

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2>Packs list</h2>
                <div>
                    <Button sx={{borderRadius: 5}} size="small" variant="contained"> Add new pack</Button>
                </div>
            </div>

            {!dataPacks.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}
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
                                    <Search/>
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
                        <ToggleButton onClick={onClickMyHandler} value="My">My</ToggleButton>
                        <ToggleButton onClick={onClickAllHandler} value="All">All</ToggleButton>

                    </ToggleButtonGroup>
                </div>
                <div className={style.numberOfCards}>
                    Number of cards
                    <RangeSlider/>
                </div>
                <div className={style.button}>
                    <Button sx={{borderRadius: 5, fontSize: 10}} size="small" variant="contained"
                            onClick={onclickResetFilterHandler}>Reset</Button>
                </div>
            </div>

            <div className={style.table}>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div className={style.cards}>Cards <SelectSort/></div>
                                </StyledTableCell>
                                <StyledTableCell align="right">Last Updated</StyledTableCell>
                                <StyledTableCell align="right">Created by</StyledTableCell>
                                <StyledTableCell align="right">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataPacks.map((el) => (
                                <StyledTableRow key={el.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {el.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{el.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="right">{el.updated}</StyledTableCell>
                                    <StyledTableCell align="right">{el.user_name}</StyledTableCell>
                                    <StyledTableCell align="right">{<ActionsPack/>}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <BasicPagination/>
        </div>
    );
};

