import { instance } from "./instance"
import {CardsPackType} from "../features/cards/packsList-reducer"

export const packsAPI={
    getCardPacks(page:number,
                 pageCount:number,
                 sort:string,
                 search:string,
                 my_id:string,
                 minCardsCount:number,
                 maxCardsCount:number,
                 ){
        return instance.get<CardPacksResponseType>('cards/pack',{params:{page:page,
                pageCount:pageCount,
                sortPacks:sort,
                packName:search,
                user_id:my_id,
                min:minCardsCount,
                max:maxCardsCount}})
    },
    createPack(value:string,privateStatus?:boolean){
        return instance.post('cards/pack',{ cardsPack:{name:value,private:privateStatus}})
    },
    deletePack(id:string){
        return instance.delete(`cards/pack?id=${id}`)
    },
    updatePack(_id:string,name:string,isPrivate:boolean){
        return instance.put('cards/pack',{cardsPack:{_id, name,private:isPrivate}})
    }
}

export const cardsAPI={
    getCards(payload = {} as CardsType) {
            return instance.get<CardsResponseType>("cards/card", {
                params: {
                    ...payload,
                },
            })
        },
        sendCard(payload = {} as CardRequestType) {
            return instance.post("cards/card", {
                card: {
                    ...payload,
                },
            })
        },
        deleteCard(id: string) {
            return instance.delete(`cards/card?id=${id}`);
        },
        updateCard(payload = {} as UpdateCardType) {
            return instance.put(`cards/card`, {
                card: {
                    ...payload,
                },
            })
        },
    }

    export type CardPacksResponseType={
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

export type CardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
    _id?: string
    updated?: string
    grade?: number
    answer?:string
    question?: string
}

export type CardRequestType = {
    cardsPack_id: string
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdateCardType = {
    _id: string
    question?: string
    answer?: string
    shots?: number
    grade?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
    comments?: string
}

export type CardResponseType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    min: number
    max: number
    _id:string
}

export type CardsResponseType = {
    cards: CardResponseType[]
    cardsTotalCount: number
    cardAnswer: string
    cardQuestion: string
    max: number
    min: number
    page: number
    pageCount: number
    packUserId: string
    cardsPack_id: string
    id: string
    infoMessage?: string
    sortCards: string
}
