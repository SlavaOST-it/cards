import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import s from "./PacksList.module.css"
import {Button, styled} from "@mui/material";
import {getCardsPacksTC} from "./packs-reducer";
import {ActionsPack} from "./actionsPack/ActionsPack";


export const PacksList = () => {
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const packs = useAppSelector(state => state.packs.cardPacks)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(getCardsPacksTC())
    }, [])

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

    if (!loggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.packsWrapper}>
            <div className={s.packsHeader}>
                <h2>Packs list</h2>
                <div>
                    <Button variant="contained" style={{ borderRadius: '20px' }}>
                        ADD NEW PACK
                    </Button>
                </div>
            </div>
            <div>
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
                            {packs.map((el) => (
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