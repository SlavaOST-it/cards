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
    cardsTotalCount: 20,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: "",
    search: '',
    sortCards: '0question',
    selected:true

}
type InitialStateCardsType = typeof initialState
type setCardsType = ReturnType<typeof setCardsAC>
type setPackUserIdType = ReturnType<typeof setPackUserIdAC>
type setSearchCardsType =ReturnType<typeof setSearchCardsAC>
 type sortCardsType =ReturnType<typeof sortCardsAC>
type setPageCardsAC=ReturnType<typeof setPageCardsAC>
type setPageCardsCountType=ReturnType<typeof setPageCardsCountAC>
export type ActionCardsType = setCardsType | setPackUserIdType|setSearchCardsType|sortCardsType|setPageCardsAC|setPageCardsCountType

export const cardsReducer = (state: InitialStateCardsType = initialState, action: ActionCardsType): InitialStateCardsType => {
    switch (action.type) {
        case "CARDS/SET_CARDS":
            return {...state, cards: action.data,cardsTotalCount: action.cardsTotalCount}
        case "CARDS/SET_PACK_USER_ID":
            return {...state, packUserId: action.id}
        case "CARDS/SET_SEARCH_CARDS":
            return{...state,search: action.search}
        case "CARDS/SORT_CARDS":
            return {...state,sortCards: action.sort,selected: action.selected}
        case "CARDS/SET_PAGE_CARDS":
            return {...state,page: action.page}
        case "CARDS/SET_PAGE_CARDS_COUNT":
            return {...state,pageCount: action.pageCount}
        default:
            return state
    }
}

export const setCardsAC = (data: CardsType[],cardsTotalCount:number) => {
    return {type: "CARDS/SET_CARDS", data,cardsTotalCount} as const
}
export const setPackUserIdAC = (id: string) => {
    return {type: "CARDS/SET_PACK_USER_ID", id} as const
}
export const setSearchCardsAC = (search: string) => {
    return {type: "CARDS/SET_SEARCH_CARDS", search} as const
}
export const sortCardsAC=(sort:string,selected:boolean)=>{
    return {type: "CARDS/SORT_CARDS", sort,selected} as const
}
export const setPageCardsAC=(page:number)=>{
    return {type: "CARDS/SET_PAGE_CARDS" ,page} as const
}
export const setPageCardsCountAC=(pageCount:number)=>{
    return {type: "CARDS/SET_PAGE_CARDS_COUNT" ,pageCount} as const
}

export const CardsTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const {packUserId, minGrade, maxGrade, search, page, pageCount, sortCards} = getState().cards
        const res = await cardsAPI.getCards(packUserId, minGrade, maxGrade, search, page, pageCount, sortCards)
        dispatch(setCardsAC(res.data.cards,res.data.cardsTotalCount))
        dispatch(setPageCardsCountAC(res.data.pageCount))
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