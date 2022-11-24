import {AppThunkType} from "../../app/store";
import axios, {AxiosError} from "axios";
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {packsAPI} from "../../api/cardsAPI";

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
    pageCount: 4,
    sort:"1cardsCount",
    search:'',
    isMyPacks:false,
    minCardsCount:0,
    maxCardsCount:50,
    cardPacksTotalCount:0
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

export type InitialStatePacksType = typeof initialState

type SetDataCardsPackType = ReturnType<typeof setDataCardsPackAC>
type setSearchType=ReturnType<typeof setSearchAC>
type setIsMyPacksType=ReturnType<typeof setIsMyPacksAC>
type setCardsCountType=ReturnType<typeof setCardsCountAC>
type setPageType=ReturnType<typeof setPageAC>
type setPageCountType=ReturnType<typeof setPageCountAC>
type setSortType=ReturnType<typeof setSortAC>
export type ActionPackListType = SetDataCardsPackType|setSearchType|setIsMyPacksType|setCardsCountType|setPageType|setPageCountType|setSortType

export const packListReducer = (state: InitialStatePacksType = initialState, action: ActionPackListType): InitialStatePacksType => {
    switch (action.type) {
        case "PACK_LIST/SET_DATA_CARDS_PACK":
            return {...state, cardPacks: action.data,cardPacksTotalCount:action.cardPacksTotalCount}
        case "PACK_LIST/SET_SEARCH":
            return {...state,search: action.search}
        case "PACK_LIST/SET_IS_MY_PACKS":
            return {...state,isMyPacks: action.isMyPacks}
        case "PACK_LIST/SET_CARDS_COUNT":
            return {...state,minCardsCount: action.value[0],maxCardsCount: action.value[1]}
        case "PACK_LIST/SET_PAGE":
            return {...state,page:action.page}
        case "PACK_LIST/SET_PAGE_COUNT":
            return {...state,pageCount: action.PageCount}
        case "PACK_LIST/SET_SORT":
            return {...state,sort: action.sort}
        default:
            return state
    }
}


export const setDataCardsPackAC = (data: CardsPackType[],cardPacksTotalCount:number) => {return {type: "PACK_LIST/SET_DATA_CARDS_PACK", data,cardPacksTotalCount} as const}
export const setSearchAC=(search:string)=>{return {type:"PACK_LIST/SET_SEARCH",search} as const }
export const setIsMyPacksAC=(isMyPacks:boolean)=>{return{type:"PACK_LIST/SET_IS_MY_PACKS",isMyPacks}as const}
export const setCardsCountAC=(value:number[])=>{return{type:"PACK_LIST/SET_CARDS_COUNT",value}as const}
export const setPageAC=(page:number)=>{return{type:"PACK_LIST/SET_PAGE",page}as const}
export const setPageCountAC=(PageCount:number)=>{return{type:"PACK_LIST/SET_PAGE_COUNT",PageCount}as const}
export const setSortAC=(sort:string)=>{return {type:"PACK_LIST/SET_SORT",sort} as const}


export const packListTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const { page,pageCount, sort, search, isMyPacks,minCardsCount,maxCardsCount} =getState().packList
        let my_id=''
        if(isMyPacks){my_id='637243ec3d150607fc4a78f4'}
        const res = await packsAPI.getCardPacks({page,pageCount, sort, search, my_id,minCardsCount,maxCardsCount})
        dispatch(setDataCardsPackAC(res.data.cardPacks,res.data.cardPacksTotalCount
        ))
        dispatch(setPageCountAC(res.data.pageCount))
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