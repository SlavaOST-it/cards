import React, {useEffect, useState} from 'react';
import {Navigate} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import style from "./CardList.module.css"
import {SearchEngine} from "../../../common/components/search/SearchEngine";
import {BasicPagination} from "../../../common/components/pagination/BasicPagination";
import {getCardsThunk, setAnswerCoverAC, setQuestionCoverAC} from '../cards-reducer'
import {HeaderTable} from "../../../common/components/headerTable/HeaderTable";
import {CardsTable} from "../cardsTable/CardsTable";
import {AddCardsModal} from "../../../common/components/modals/addCardsModal/AddCardsModal";
import {BackToPacksList} from "../../../common/components/backToPacksLink/BackToPacksList";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";


export const CardList = () => {

    const dispatch = useAppDispatch()
    const namePack = useAppSelector(state => state.packList.packName)
    const isLoggedIn = useAppSelector(state => state.login.loggedIn)
    const packUserId = useAppSelector(state => state.cards.packUserId)
    const minGrade = useAppSelector(state => state.cards.min)
    const maxGrade = useAppSelector(state => state.cards.max)
    const search = useAppSelector(state => state.cards.cardQuestion)
    const page = useAppSelector(state => state.cards.page)
    const pageCount = useAppSelector(state => state.cards.pageCount)
    const sortCards = useAppSelector(state => state.cards.sortCards)
    const dataCards = useAppSelector(state => state.cards.cards)
    const cardsPackId = useAppSelector(state => state.packList.packId)
    const cardUserId = useAppSelector(state => state.packList.userID)
    const myId = useAppSelector(state => state.profile._id)

    const [value, setValue] = useState('')
    const [active, setActive] = useState(false)

    const addNewCard = () => {
        setActive(true)
        dispatch(setQuestionCoverAC(''))
        dispatch(setAnswerCoverAC(''))
    }

    const learnPack = () => {
        alert('Lear Pack')
    }

    const callback = () => setActive(!active)

    useEffect(() => {
        dispatch(getCardsThunk(cardsPackId))
    }, [packUserId, minGrade, maxGrade, search, page, pageCount, sortCards])

    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>

            <BackToPacksList/>

            <div className={style.wrapper}>
                <AddCardsModal
                    answerCard={''}
                    questionCard={''}
                    cardsPackId={cardsPackId}
                    setActive={callback}
                    active={active}
                />

                <HeaderTable callbackToAdd={myId === cardUserId ? addNewCard : learnPack}
                             titleButton={myId === cardUserId ? "Add new card" : "Learn to pack"}
                             title={namePack}
                             disabled={((!dataCards.length) && (myId !== cardUserId))}
                />

                {!dataCards.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

                <div className={style.search}>
                    <SearchEngine setValue={setValue} value={value}/>
                </div>

                <div className={style.table}>
                    <CardsTable/>
                </div>

                <div className={style.pagination}>
                    <BasicPagination type={'cards'}/>
                </div>
            </div>
        </div>
    );
};

