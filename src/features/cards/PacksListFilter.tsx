import React, {useEffect, useState, FC} from 'react';
import style from "./PacksList.module.css"
import Button from "@mui/material/Button";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import {changePackStatusAC, getPackListTC, setCardsCountAC, setIsMyPacksAC} from "./packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {RangeSlider} from "../../common/components/rangeSlider/RangeSlider";
import {BasicPagination} from "../../common/components/pagination/BasicPagination";
import {PATH} from "../../utils/routes/routes";
import {Navigate} from "react-router-dom";
import {SearchEngine} from "../../common/components/search/SearchEngine";
import {AddNewPackModal} from "../modals/addNewPackModal";
import {EditPackModal} from "../modals/editPackModal";
import {PacksTable} from "./packsTable/PacksTable";
import {AddPackModal} from "../../common/components/modals/addPackModal/AddPackModal";
import {DeletePackModal} from "../../common/components/modals/deletePackModal/DeletePackModal";


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
    // const isOpenModal = useAppSelector(state => state.packList.isOpenModal)
    const packId = useAppSelector(state => state.packList.packId)

    const [alignment, setAlignment] = useState('All')
    const [value, setValue] = useState('')
    const [openAddPackModal, setOpenAddPackModal] = useState(false)


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

    const addNewPackHandler = () => {
        setOpenAddPackModal(!openAddPackModal)
    }

    useEffect(() => {
        dispatch(getPackListTC())
    }, [page, pageCount, sort, search, isMyPacks, minCardsCount, maxCardsCount])


    if (!isLoggedIn) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={style.container}>
            <div className={style.header}>
                <h2>Packs list</h2>
                <div>
                    <Button
                        onClick={addNewPackHandler}
                        sx={{borderRadius: 5}} size="small"
                        variant="contained"
                    >
                        Add new pack
                    </Button>
                </div>
            </div>

            <AddPackModal active={openAddPackModal} setActive={addNewPackHandler}/>

            {packId && <EditPackModal/>} {/*проверяем есть ли Id, если есть отрисовываем компоненту*/}

            {!dataPacks.length && <div>В данной колоде нету карточек удовлетворяющих поиску</div>}

            <div className={style.filtering}>
                <SearchEngine setValue={setValue} value={value}/>

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
                    <Button sx={{borderRadius: 5, fontSize: 10}}
                            size="small" variant="contained"
                            onClick={onclickResetFilterHandler}
                    >
                        Reset
                    </Button>
                </div>
            </div>

            <div className={style.table}>
                <PacksTable/>
            </div>

            <BasicPagination type={'packs'}/>
        </div>
    );
};