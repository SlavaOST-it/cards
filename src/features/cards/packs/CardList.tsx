import React, {useEffect, useState} from 'react';
import {styled} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import {Navigate} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import style from "../PacksList.module.css";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import {SelectSort} from "../../../common/components/select/SelectSort";
import TableBody from "@mui/material/TableBody";
import {CardsTC} from "./card-reduser";
import {SearchEngine} from "../../../common/components/search/SearchEngine";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";


export const CardList = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const cards = useAppSelector(state => state.cards.cards)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const minGrade = useAppSelector(state => state.cards.minGrade)
    const maxGrade = useAppSelector(state => state.cards.maxGrade)
    const search = useAppSelector(state => state.cards.search)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const dataCards =useAppSelector(state=>state.cards.cards)

    const[value,setValue]=useState('')


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

    useEffect(() => {
        dispatch(CardsTC())
    }, [packUserId, minGrade, maxGrade, search, page, pageCount, sortCards])

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.table}>
            {!dataCards.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}
            <SearchEngine setValue={setValue} value={value} />
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell align="right">
                                <div className={style.cards}>Question <SelectSort /></div>
                            </StyledTableCell>
                            <StyledTableCell align="right">Answer</StyledTableCell>
                            <StyledTableCell align="right">Last Updated</StyledTableCell>
                            <StyledTableCell align="right">Grade</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map((el) => (
                            <StyledTableRow key={el._id}>
                                <StyledTableCell component="th" scope="row">
                                    {el._id}
                                </StyledTableCell>
                                <StyledTableCell align="right">{el.answer}</StyledTableCell>
                                <StyledTableCell align="right">{el.question}</StyledTableCell>
                                <StyledTableCell align="right">{el.updated}</StyledTableCell>
                                <StyledTableCell align="right">{el.grade}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <BasicPagination type={'cards'}/>
        </div>
    );
};

