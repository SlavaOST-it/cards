import {AppThunkType} from "../../app/store";
import {authAPI} from "../../api/authAPI";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

let initialState = {
    cardPacks: [{
        _id: '',
        user_id: '',
        user_name: '',
        private: false,
        name: '',
        grade: 0,
        shots: 0,
        cardsCount: 0,
        type: '',
        rating: 0,
        created: '',
        updated: '',
    }],
    page: 0,
    pageCount: 0,
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
}

export type CardsPackType = {
    _id: string
    user_id: string,
    user_name: string,
    private: boolean,
    name: string,
    grade: number,
    shots: number,
    cardsCount: number,
    type: string,
    rating: number,
    created: string,
    updated: string,

}

type InitialStateType = typeof initialState

type SetDataCardsPackType = ReturnType<typeof setDataCardsPackAC>
export type ActionPackListType = SetDataCardsPackType

export const packListReducer = (state: InitialStateType = initialState, action: ActionPackListType): InitialStateType => {
    switch (action.type) {
        case "PACK_LIST/SET_DATA_CARDS_PACK":
            return {...state, cardPacks: action.data}
        default:
            return state
    }
}


export const setDataCardsPackAC = (data: CardsPackType[]) => {
    return {type: "PACK_LIST/SET_DATA_CARDS_PACK", data} as const
}

export const packListTC = (packName: string): AppThunkType => async (dispatch) => {
    try {
        const res = await authAPI.setCardPacks(packName)
        dispatch(setDataCardsPackAC(res.data.cardPacks
        ))
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