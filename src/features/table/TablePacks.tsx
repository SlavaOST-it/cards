import React from 'react';
import {CardsPackType} from "../cards/packList-reducer";
import style from "./TablePacks.module.css"
import {SelectSort} from "../../common/components/select/SelectSort";

type TablePacksType = {
    CardsPack: Array<CardsPackType>
}
export const TablePacks = (props: TablePacksType) => {
    return (
        <div className={style.container}>
            <div className={style.header}>
                <div className={style.nameColumn}></div>
                <div className={style.nameColumn}></div>
                <div className={style.nameColumn}><SelectSort/></div>
                <div className={style.nameColumn}></div>
            </div>
            {props.CardsPack.map(el => {
                return <div key={el._id} className={style.block}>
                    <div className={style.column}>{el.user_name}</div>
                    <div className={style.column}>{el.name}</div>
                    <div className={style.column}>{el.updated}</div>
                    <div className={style.column}>{el.cardsCount}</div>

                    <div className={style.column}>
                        <button>delete</button>
                    </div>
                </div>
            })}
        </div>
    );
};

