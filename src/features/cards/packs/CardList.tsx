import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import style from "./CardList.module.css"
import {SearchEngine} from "../../../common/components/search/SearchEngine";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";
import {getCardsTC} from '../cards-reducer'
import {HeaderTable} from "../../../common/components/headerTable/HeaderTable";
import {CardsTable} from "../cardsTable/CardsTable";


export const CardList = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const minGrade = useAppSelector(state => state.cards.min)
    const maxGrade = useAppSelector(state => state.cards.max)
    const search = useAppSelector(state => state.cards.cardQuestion)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const dataCards =useAppSelector(state=>state.cards.cards)

    const[value,setValue]=useState('')


    const addNewCard=()=>{
        alert('new')
    }

    useEffect(() => {
        dispatch(getCardsTC())
    }, [packUserId, minGrade, maxGrade, search, page, pageCount, sortCards])

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>
            <HeaderTable callbackToAdd={addNewCard} title={'Cards list'}/>
            {!dataCards.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}
            <div className={style.search}>
                <SearchEngine setValue={setValue} value={value} />
            </div>

            <CardsTable/>
            <BasicPagination type={'cards'}/>
        </div>
    );
};

