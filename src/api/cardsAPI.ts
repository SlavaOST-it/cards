import { instance } from "./instance"
import {CardsPackType} from "../features/cards/packList-reducer";

export const packsAPI={
    getCardPacks(page:number,
                 pageCount:number,
                 sort:string,
                 search:string,
                 my_id:string,
                 minCardsCount:number,
                 maxCardsCount:number){
        return instance.get<CardPacksResponseType>('cards/pack',{params:{page:page,
                pageCount:pageCount,
                sortPacks:sort,
                packName:search,
                user_id:my_id,
                min:minCardsCount,
                max:maxCardsCount}})
    }
}

type CardPacksResponseType={
    cardPacks: CardsPackType[],
    page: number,
    pageCount: number,
    sort:string,
    search:string,
    isMyPacks:boolean,
    minCardsCount:number,
    maxCardsCount:number,
    cardPacksTotalCount:number
}

export type PacksRequest = {
    page:number,
    pageCount:number,
    sort:string,
    search:string,
    my_id:string,
    minCardsCount:number,
    maxCardsCount:number
}