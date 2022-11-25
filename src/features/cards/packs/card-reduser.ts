import {cardsAPI, CardsType} from "../../../api/cardsAPI";
import {AppThunkType} from "../../../app/store";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../../app/app-reducer";

const initialState = {
    cards: [
        {
            answer: "",
            question: "",
            cardsPack_id: "",
            grade: 0,
            shots: 1,
            user_id: "",
            created: "",
            updated: "",
            _id: "",
        }
    ],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "",
    search: '',
    sortCards: '0grade'

}
type InitialStateCardsType = typeof initialState
type setCardsType = ReturnType<typeof setCardsAC>
type setPackUserIdType = ReturnType<typeof setPackUserIdAC>
type setSearchCardsType =ReturnType<typeof setSearchCardsAC>
export type ActionCardsType = setCardsType | setPackUserIdType|setSearchCardsType

export const cardsReducer = (state: InitialStateCardsType = initialState, action: ActionCardsType): InitialStateCardsType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, cards: action.data}
        case "CARDS/SET_PACK_USER_ID":
            return {...state, packUserId: action.id}
        case "PACK_LIST/SET_SEARCH_CARDS":
            return{...state,search: action.search}
        default:
            return state
    }
}

export const setCardsAC = (data: CardsType[]) => {
    return {type: "CARDS/SET_CARDS", data} as const
}
export const setPackUserIdAC = (id: string) => {
    return {type: "CARDS/SET_PACK_USER_ID", id} as const
}
export const setSearchCardsAC = (search: string) => {
    return {type: "PACK_LIST/SET_SEARCH_CARDS", search} as const
}

export const CardsTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const {packUserId, minGrade, maxGrade, search, page, pageCount, sortCards} = getState().cards
        const res = await cardsAPI.getCards(packUserId, minGrade, maxGrade, search, page, pageCount, sortCards)
        dispatch(setCardsAC(res.data.cards))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(setAppStatusAC('failed'))
            dispatch(setAppErrorAC(error))
        }
    }
}