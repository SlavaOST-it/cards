import { instance } from "./instance"
import {CardsPackType} from "../features/cards/packList-reducer";

export const packsAPI={
    getCardPacks(data:PacksRequest){
        return instance.get<CardPacksResponseType>('cards/pack',{params:{data}})
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