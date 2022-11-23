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
    sort:"1updated",
    search:'',
    isMyPacks:false
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
type setSearchType=ReturnType<typeof setSearchAC>
type setIsMyPacksType=ReturnType<typeof setIsMyPacksAC>
export type ActionPackListType = SetDataCardsPackType|setSearchType|setIsMyPacksType

export const packListReducer = (state: InitialStateType = initialState, action: ActionPackListType): InitialStateType => {
    switch (action.type) {
        case "PACK_LIST/SET_DATA_CARDS_PACK":
            return {...state, cardPacks: action.data}
        case "PACK_LIST/SET_SEARCH":
            return {...state,search: action.search}
        case "PACK_LIST/SET_IS_MY_PACKS":
            return {...state,isMyPacks: action.isMyPacks}
        default:
            return state
    }
}


export const setDataCardsPackAC = (data: CardsPackType[]) => {return {type: "PACK_LIST/SET_DATA_CARDS_PACK", data} as const}
export const setSearchAC=(search:string)=>{return {type:"PACK_LIST/SET_SEARCH",search} as const }
export const setIsMyPacksAC=(isMyPacks:boolean)=>{return{type:"PACK_LIST/SET_IS_MY_PACKS",isMyPacks}as const}



export const packListTC = (): AppThunkType => async (dispatch, getState) => {
    try {
        const { page,pageCount, sort, search, isMyPacks} =getState().packList
        let my_id=''
        if(isMyPacks){my_id='637243ec3d150607fc4a78f4'}
        const res = await authAPI.getCardPacks(page,pageCount, sort, search, my_id)
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