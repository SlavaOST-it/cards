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
import {useAppSelector} from "../../../app/hooks";

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
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0.5,
        },
    }));

    return (
        <div>
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
                                <StyledTableCell align="right">{el.question}</StyledTableCell>
                                <StyledTableCell align="right">{el.answer}</StyledTableCell>
                                <StyledTableCell align="right">{el.updated}</StyledTableCell>
                                <StyledTableCell align="right">{el.grade}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
};

