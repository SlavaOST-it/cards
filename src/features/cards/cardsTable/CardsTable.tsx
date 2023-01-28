import React from 'react';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import style from "../PacksList.module.css";
import {SelectSort} from "../../../common/components/select/SelectSort";
import TableBody from "@mui/material/TableBody";
import {styled} from "@mui/material";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import {BasicRating} from "../ratingCards/RatingCard";
import {useAppSelector} from "../../../utils/hooks/hooks";
import {baseDeckCover} from "../../../assets/baseDeckCover";

export const CardsTable = () => {
    const cards = useAppSelector(state => state.cards.cards)


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
        '&:last-child td, &:last-child th': {
            border: 0.5,
        },
    }));


    return (
        <TableContainer component={Paper}>
            <Table aria-label="customized table">
                <TableHead className={style.tableHeader}>
                    <TableRow className={style.tableHeader}>
                        <StyledTableCell align="center">
                            <div className={style.cards}>Question <SelectSort/></div>
                        </StyledTableCell>
                        <StyledTableCell align="center">Answer</StyledTableCell>
                        <StyledTableCell align="center">Last Updated</StyledTableCell>
                        <StyledTableCell align="center">Grade</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cards.map((el) => (
                        <StyledTableRow key={el._id} className={style.tableHeader}>
                            <StyledTableCell align="center">{el.questionImg?<img  className={style.coverImg} src={el.questionImg.length>100?el.questionImg:baseDeckCover} alt={'questionImg'}/>:el.question }</StyledTableCell>
                            <StyledTableCell align="center">{el.answerImg?<img className={style.coverImg} src={el.answerImg.length>100?el.answerImg:baseDeckCover} alt={'answerImg'}/>:el.answer}</StyledTableCell>
                            <StyledTableCell align="center">{el.updated.substr(0, 10)}</StyledTableCell>
                            <StyledTableCell align="center">
                                <BasicRating grade={el.grade}/>
                            </StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};