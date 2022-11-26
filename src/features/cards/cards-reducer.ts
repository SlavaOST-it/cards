import {AppThunkType} from '../../app/store'
import {setAppErrorAC, setAppStatusAC, setInitializedAC} from '../../app/app-reducer'
import {CardResponseType, cardsAPI, CardsResponseType, CardsType} from '../../api/cardsAPI'
import {setCardsAC, setPackUserIdAC, setPageCardsCountAC, setSearchCardsAC, sortCardsAC} from './packs/card-reduser'
import axios, {AxiosError} from 'axios'

type setCardsType = ReturnType<typeof setCardsAC>
type setPackUserIdType = ReturnType<typeof setPackUserIdAC>
type setSearchCardsType = ReturnType<typeof setSearchCardsAC>
type sortCardsType = ReturnType<typeof sortCardsAC>
type setPageCardsAC = ReturnType<typeof setPageCardsAC>
type setPageCardsCountType = ReturnType<typeof setPageCardsCountAC>

export type CardsActionsType =
    ReturnType<typeof setCards> |
    ReturnType<typeof addCard> |
    ReturnType<typeof editCard> |
    ReturnType<typeof setFilterCards> |
    ReturnType<typeof setPackId> |
    ReturnType<typeof setQuestionName> |
    ReturnType<typeof setAnswerName> |
    ReturnType<typeof clearQuestionAnswerName> |
    ReturnType<typeof clearCards> |
    ReturnType<typeof setCurrentCardsPage> |
    ReturnType<typeof setPageCount> |
    setCardsType | setPackUserIdType | setSearchCardsType | sortCardsType | setPageCardsAC | setPageCardsCountType

type InitialStateType = {
    cards: CardsType[]
    cardsTotalCount: number
    max: number
    min: number
    page: number
    pageCount: number
    cardQuestion: string
    sortCards: string
    packUserId: string
    tokenDeathTime: number
    answer: string
    question: string
    grade: number
    packId: string
    selected: boolean
    cardsPack_id: string
}

const initialState: InitialStateType = {
    cards: [],
    cardsTotalCount: 0,
    max: 0,
    min: 0,
    page: 1,
    pageCount: 2,
    cardQuestion: '',
    sortCards: '0grade',
    packUserId: '',
    tokenDeathTime: 0,
    answer: '',
    question: '',
    grade: 0,
    packId: '',
    selected: true,
    cardsPack_id: ''
}

export type GetCardsParamsType = {
    cardAnswer: string
    cardQuestion: string
    cardsPack_id: string // обязательно!
    min: number
    max: number
    sortCards: string
    page: number
    pageCount: number
    id: string
}

export const cardsReducer = (state = initialState, action: CardsActionsType): InitialStateType => {
    switch (action.type) {
        case 'CARDS/SET-CARDS':
            return {
                ...state,
                packUserId: action.payload.data.packUserId,
                cards: action.payload.data.cards,
                cardsTotalCount: action.payload.data.cardsTotalCount

            }
        case 'CARDS/ADD-CARDS':
            return {
                ...state, cards: state.cards.map(c => c.id === action.payload.cardsPack_id
                    ? {...c, question: action.payload.question, cardAnswer: action.payload.answer}
                    : c)
            }
        case 'CARDS/EDIT-CARD':
            return {
                ...state,
                cards: state.cards.map(c => c.id === action.payload._id ? {
                    ...c,
                    question: action.payload.newQuestion
                } : c)
            }
        case 'CARDS/SET-FILTER':
            return {...state, sortCards: `${action.payload.value}${action.payload.name}`}
        case 'CARDS/SET-PACK-ID':
            return {...state, packId: action.payload.packId}
        case 'CARDS/SET-QUESTION-NAME':
            return {...state, question: action.payload.question}
        case 'CARDS/SET-ANSWER-NAME':
            return {...state, answer: action.payload.question}
        case 'CARDS/CLEAR-QUESTION-ANSWER-NAME':
            return {...state, answer: '', question: ''}
        case 'SET-CURRENT-CARDS-PAGE':
            return {...state, page: action.payload.page}
        case 'CARDS/CLEAR-CARDS':
            return initialState
        case 'CARDS/SET-PAGE-COUNT':
            return {...state, pageCount: action.payload.value}
        case "CARDS/SET_CARDS":
            return {...state, cards: action.data,cardsTotalCount: action.cardsTotalCount}
        case "CARDS/SET_PACK_USER_ID":
            return {...state, packUserId: action.id}
        case "CARDS/SET_SEARCH_CARDS":
            return{...state,cardQuestion: action.search}
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

export const setCards = (data: any) => ({type: 'CARDS/SET-CARDS', payload: data} as const)

export const addCard = (cardsPack_id: string, question: string, answer: string) => ({
    type: 'CARDS/ADD-CARDS',
    payload: {cardsPack_id, question, answer}
} as const)

export const editCard = (_id: string, newQuestion: string, comment?: string) => ({
    type: 'CARDS/EDIT-CARD',
    payload: {_id, newQuestion, comment}
} as const)

export const setFilterCards = (value: number, name: string) => ({
    type: 'CARDS/SET-FILTER',
    payload: {value, name}
} as const)

export const setPackId = (packId: string) => ({
    type: 'CARDS/SET-PACK-ID',
    payload: {packId}
} as const)

export const setQuestionName = (question: string) => ({
    type: 'CARDS/SET-QUESTION-NAME',
    payload: {question}
} as const)

export const setAnswerName = (question: string) => ({
    type: 'CARDS/SET-ANSWER-NAME',
    payload: {question}
} as const)

export const clearQuestionAnswerName = () => ({
    type: 'CARDS/CLEAR-QUESTION-ANSWER-NAME',
} as const)

export const setCurrentCardsPage = (page: number) => ({
    type: 'SET-CURRENT-CARDS-PAGE',
    payload: {page}
} as const)

export const clearCards = () => ({
    type: 'CARDS/CLEAR-CARDS'
} as const)

export const setPageCount = (value: number) => ({
    type: 'CARDS/SET-PAGE-COUNT',
    payload: {value}
} as const)

export const setCardsAC = (data: CardResponseType[],cardsTotalCount:number) => {
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

export const setCardsThunk = (packId: string): AppThunkType =>
    (dispatch, getState) => {
        dispatch(setInitializedAC(true))
        const {answer, page, pageCount, sortCards, cardQuestion, packUserId} = getState().cards
        const payload: CardsResponseType = {
            cardAnswer: answer,
            cardQuestion: cardQuestion,
            cardsPack_id: packUserId,
            page: page,
            pageCount: pageCount,
            cards: [],
            sortCards: sortCards,


            cardsTotalCount: 0,
            max: 0,
            min: 0,
            packUserId: '',
            id: ''
        }
        cardsAPI.getCards(payload)
            .then((res) => {
                dispatch(setCards(res.data))
            })
    }
export const addCardThunk = (cardsPack_id: string, cardQuestion: string, cardAnswer: string): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    cardsAPI.getCards({cardsPack_id, cardQuestion, cardAnswer})
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
}
export const deleteCardThunk = (cardsPack_id: string, cardsId: string): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    cardsAPI.deleteCard(cardsId)
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
}
export const editCardThunk = (
    cardsPack_id: string,
    _id: string,
    newQuestion: string,
    newAnswer: string,
    comment?: string
): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    cardsAPI.updateCard({_id: _id, question: newQuestion, answer: newAnswer, comments: comment})
        .then(() => {
            dispatch(setCardsThunk(cardsPack_id))
        })
}
export const learnCardsThunk = (packUserId: string): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    const data: GetCardsParamsType = {
        cardAnswer: '',
        cardQuestion: '',
        cardsPack_id: packUserId,
        min: 0,
        max: 0,
        sortCards: '0question',
        page: 1,
        pageCount: 1000,
        id: ''
    }
    cardsAPI.getCards(data)
        .then((res) => {
            dispatch(setCards(res.data))
        })
}

export const CardsTC = (): AppThunkType => async (dispatch, getState) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const {cardsPack_id, min, max, cardQuestion, page, pageCount, sortCards} = getState().cards
        const res = await cardsAPI.getCards({cardsPack_id, min, max, cardQuestion, page, pageCount, sortCards})
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


