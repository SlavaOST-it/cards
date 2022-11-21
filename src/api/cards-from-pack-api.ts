import {instance} from './cards-api'

export type CardsType = {
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id: string
    min?: number
    max?: number
    sortCards?: string
    page?: number
    pageCount?: number
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
}

export type CardsResponseType = {
    cards: CardResponseType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export const cardsApi = {
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