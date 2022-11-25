import { instance } from "./instance"
import {CardsPackType} from "../features/cards/packsList-reducer";

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

export const cardsAPI={
    getCards(packUserId:string,minGrade:number,maxGrade:number,search:string,page:number,pageCount:number,sort:string){
return instance.get<CardsResponseType>('/cards/card',{params:{cardsPack_id:packUserId,cardQuestion:search,sortCards:sort,page:page,pageCount:pageCount,min:minGrade,max:maxGrade}})
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
type CardsResponseType={
    cards: CardsType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserI:string
}
export type CardsType={
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    user_id: string
    created: string
    updated: string
    _id: string
}
