import React, {useEffect, useState} from 'react';
import style from "./PacksList.module.css"
import {Button, styled, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {changePackStatusAC, getPackListTC, setCardsCountAC, setIsMyPacksAC} from "./packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {PATH} from "../../utils/routes/routes";
import {Navigate, NavLink} from "react-router-dom";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import {ActionsPack} from "./actionsPack/ActionsPack";
import {SelectSort} from "../../common/components/select/SelectSort";
import {SearchEngine} from "../../common/components/search/SearchEngine";
import {setPackUserIdAC} from './cards-reducer'
import {AddNewPackModal} from "../modals/addNewPackModal";
import {EditPackModal} from "../modals/editPackModal";

export const PacksListFilter = () => {
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
    const isAddNewPack=useAppSelector(state => state.packList.isAddNewPack)
    const packId=useAppSelector(state => state.packList.packId)

    const [alignment, setAlignment] = useState('All')
    const [value, setValue] = useState('')


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

    const onclickResetFilterHandler = () => {
        setValue('')
        dispatch(setIsMyPacksAC(false))
        dispatch(setCardsCountAC([0, 50]))
    }
const addNewPackHandler=()=>{
    dispatch(changePackStatusAC(true))
}

    useEffect(() => {
        dispatch(getPackListTC())
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
            // border: 0.5,
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
                    <Button onClick={addNewPackHandler} sx={{borderRadius: 5}} size="small" variant="contained"> Add new pack</Button>
                </div>
            </div>
            {isAddNewPack&&<AddNewPackModal/>}
            {packId&&<EditPackModal/>} {/*проверяем есть ли Id, если есть отрисовываем компоненту*/}

            {!dataPacks.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}
            <div className={style.filtering}>
                <SearchEngine setValue={setValue} value={value} />
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
                    <Table aria-label="customized table" >
                        <TableHead className={style.tableHeader}>
                            <TableRow className={style.tableHeader}>
                                <StyledTableCell align="center">Name <SelectSort /></StyledTableCell>
                                <StyledTableCell align="center">Cards</StyledTableCell>
                                <StyledTableCell align="center">Last Updated</StyledTableCell>
                                <StyledTableCell align="center">Created by</StyledTableCell>
                                <StyledTableCell sx={{width: 120}} align="center">Actions</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {dataPacks.map((el) => (
                                <StyledTableRow key={el._id} className={style.tableHeader}>
                                    <StyledTableCell  align="center">
                                        <NavLink onClick={()=>dispatch(setPackUserIdAC(el._id))} to={PATH.cardList}>{el.name}</NavLink>
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{el.cardsCount}</StyledTableCell>
                                    <StyledTableCell align="center">{el.updated.substr(0, 10)}</StyledTableCell>
                                    <StyledTableCell align="center">{el.user_name}</StyledTableCell>
                                    <StyledTableCell sx={{width: 70}} align="right">{<ActionsPack  id={el._id}/>}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <BasicPagination type={'packs'}/>
        </div>
    );
};