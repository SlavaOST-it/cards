import {instance} from "./authAPI";
import {CardsPackType} from "../features/packList/packList-reducer";

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