import React, {ChangeEvent, useState} from 'react';
import style from "./PacksList.module.css"
import {Button, InputAdornment, styled, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {Search} from "@mui/icons-material";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {packListTC} from "./packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import {ActionsPack} from "../cards/actionsPack/ActionsPack";
import TableContainer from "@mui/material/TableContainer";

export const PackList = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const dataPacks = useAppSelector(state => state.packList.cardPacks)
    const [alignment, setAlignment] = useState('My')

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(packListTC())
    }

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
                Packs list
                <Button sx={{borderRadius: 5}} size="small" variant="contained"> Add new pack</Button>
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
                {/*{dataPacks.map(el => {*/}
                {/*    return <div key={el._id}>{el.name}</div>*/}
                {/*})}*/}
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 700}} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Cards</StyledTableCell>
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
        </div>
    );
};

