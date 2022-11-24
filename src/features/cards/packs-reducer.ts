import {AppThunkType} from "../../app/store";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";

export type SetCardsPacksAT = ReturnType<typeof setCardsPacksAC>
export type PacksActionType = SetCardsPacksAT

export type InitialStateType = {
    cardPacks: [
        {
            _id: string,
            user_id: string,
            user_name: string,
            private: boolean,
            name: string,
            cardsCount: number,
            created: string,
            type: string,
            updated: string
        },
    ],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    sort: string,
    search: string,
    isMyPacks: boolean
}
const initialState: InitialStateType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            user_name: "",
            private: false,
            name: "",
            cardsCount: 0,
            type: "pack",
            created: "",
            updated: "",
        },
    ],
    page: 1,
    pageCount: 10,
    sort: '0updated',
    search: "",
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 0,
    isMyPacks: false
}

export const packsReducer = (state: InitialStateType = initialState, action: PacksActionType): InitialStateType => {
    switch (action.type) {
        case "PACKS/SET_CARDS_PACKS":
            return action.data

        default:
            return {...state}
    }
}
// ======ActionCreators ===== //
export const setCardsPacksAC = (data: InitialStateType) => ({type: "PACKS/SET_CARDS_PACKS", data} as const)

// ======ThunkCreators ===== //
export const getCardsPacksTC = (): AppThunkType => async (dispatch, getState) => {
    // const {page, pageCount, sort, search, isMyPacks} = getState().packs
    dispatch(setAppStatusAC('loading'))
    try {
        // let res = await packsAPI.getPacks({page, pageCount, sort, search, isMyPacks})
        // dispatch(setCardsPacksAC(res))
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