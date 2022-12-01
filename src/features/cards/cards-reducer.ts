import {AppThunkType} from '../../app/store'
import {setAppStatusAC, setInitializedAC} from '../../app/app-reducer'
import {CardResponseType, cardsAPI, CardsType} from '../../api/cardsAPI'
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";

type setCardsType = ReturnType<typeof setCardsAC>
type setPackIdType = ReturnType<typeof setPackIdAC>
type setSearchCardsType = ReturnType<typeof setSearchCardsAC>
type sortCardsType = ReturnType<typeof sortCardsAC>
type setPageCardsAC = ReturnType<typeof setPageCardsAC>
type setPageCardsCountType = ReturnType<typeof setPageCardsCountAC>
type setCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>

export type CardsActionsType =
    ReturnType<typeof addCardAC> |
    ReturnType<typeof editCardAC> |
    ReturnType<typeof setFilterCardsAC> |
    ReturnType<typeof setPackId> |
    ReturnType<typeof setQuestionNameAC> |
    ReturnType<typeof setAnswerNameAC> |
    ReturnType<typeof clearQuestionAnswerName> |
    ReturnType<typeof clearCardsAC> |
    ReturnType<typeof setCurrentCardsPage> |
    ReturnType<typeof setPageCountAC> |
    setCardsType | setPackIdType | setSearchCardsType | sortCardsType | setPageCardsAC | setPageCardsCountType|setCardsTotalCountType

type InitialStateType = {
    cards: CardResponseType[]
    cardsTotalCount: number
    max: number
    min: number
    page: number
    pageCount: number
    cardQuestion: string
    sortCards: string
    packUserId: string
    tokenDeathTime: number
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
    pageCount: 4,
    cardQuestion: '',
    sortCards: '0grade',
    packUserId: '',
    tokenDeathTime: 0,
    grade: 7,
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
                ...state, cards: action.payload.data
            }
/*        case 'CARDS/ADD-CARDS':
            return {
                ...state, cards: state.cards.map(c => c._id === action.payload.cardsPack_id
                    ? {...c, question: action.payload.question, cardAnswer: action.payload.answer}
                    : c)
            }
        case 'CARDS/EDIT-CARD':
            return {
                ...state,
                cards: state.cards.map(c => c._id === action.payload._id ? {
                    ...c,
                    question: action.payload.newQuestion
                } : c)
            }*/
        case 'CARDS/SET-PACK-ID':
            return {...state, packId: action.payload.packId}
        case 'CARDS/SET-QUESTION-NAME':
        case 'CARDS/CLEAR-CARDS':
            return initialState
        case "CARDS/SET_PACK_USER_ID":
            return {...state, cardsPack_id: action.id}
        case "CARDS/SET_SEARCH_CARDS":
            return {...state, cardQuestion: action.search}
        case "CARDS/SORT_CARDS":
            return {...state, sortCards: action.sort, selected: action.selected}
        case "CARDS/SET_PAGE_CARDS":
            return {...state, page: action.page}
        case "CARDS/SET_PAGE_CARDS_COUNT":
            return {...state,pageCount:action.pageCount}
        case "CARDS/SET_PAGE_TOTAL_COUNT":
            return{...state,cardsTotalCount:action.totalCount}
        default:
            return state
    }
}

export const setCardsAC = (data: CardResponseType[]) => ({type: 'CARDS/SET-CARDS', payload: {data}} as const)

export const addCardAC = (cardsPack_id: string, question: string, answer: string) => ({
    type: 'CARDS/ADD-CARDS',
    payload: {cardsPack_id, question, answer}
} as const)

export const editCardAC = (_id: string, newQuestion: string, comment?: string) => ({
    type: 'CARDS/EDIT-CARD',
    payload: {_id, newQuestion, comment}
} as const)

export const setFilterCardsAC = (value: number, name: string) => ({
    type: 'CARDS/SET-FILTER',
    payload: {value, name}
} as const)

export const setPackId = (packId: string) => ({
    type: 'CARDS/SET-PACK-ID',
    payload: {packId}
} as const)

export const setQuestionNameAC = (question: string) => ({
    type: 'CARDS/SET-QUESTION-NAME',
    payload: {question}
} as const)

export const setAnswerNameAC = (question: string) => ({
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

export const clearCardsAC = () => ({
    type: 'CARDS/CLEAR-CARDS'
} as const)

export const setPageCountAC = (value: number) => ({
    type: 'CARDS/SET-PAGE-COUNT',
    payload: {value}
} as const)


export const setPackIdAC = (id: string) => {
    return {type: "CARDS/SET_PACK_USER_ID", id} as const
}

export const setSearchCardsAC = (search: string) => {
    return {type: "CARDS/SET_SEARCH_CARDS", search} as const
}

export const sortCardsAC = (sort: string, selected: boolean) => {
    return {type: "CARDS/SORT_CARDS", sort, selected} as const
}

export const setPageCardsAC = (page: number) => {
    return {type: "CARDS/SET_PAGE_CARDS", page} as const
}

export const setPageCardsCountAC = (pageCount: number) => {
    return {type: "CARDS/SET_PAGE_CARDS_COUNT", pageCount} as const
}
export const setCardsTotalCountAC = (totalCount: number) => {
    return {type: "CARDS/SET_PAGE_TOTAL_COUNT", totalCount} as const
}

export const getCardsThunk = (packId: string): AppThunkType =>
    async (dispatch, getState) => {
        /* dispatch(setInitializedAC(true))*/
        dispatch(setAppStatusAC('loading'))
        try {
        const {page, pageCount, sortCards, cardQuestion} = getState().cards
        const payload: CardsType = {
            cardAnswer: '',
            cardQuestion: cardQuestion,
            cardsPack_id: packId,
            page: page,
            pageCount: pageCount,
            sortCards: sortCards,
            max: 0,
            min: 0,
        }
        const res = await cardsAPI.getCards(payload)

            dispatch(setCardsAC(res.data.cards))
            dispatch(setCardsTotalCountAC(res.data.cardsTotalCount))
            dispatch(setAppStatusAC('succeed'))
            /* dispatch(setAnswerName(res.data.cardAnswer))
             dispatch(setQuestionName(res.data.cardQuestion))*/
        } catch (e) {
            return baseErrorHandler(e as Error | AxiosError, dispatch)
        }
    }
export const addCardThunk = (cardsPack_id: string, question: string, answer: string): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    cardsAPI.sendCard({cardsPack_id, question, answer})
        .then(() => {
            dispatch(getCardsThunk(cardsPack_id))
        })
}

export const deleteCardThunk = (cardsPack_id: string, cardsId: string): AppThunkType => (dispatch) => {
    dispatch(setInitializedAC(true))
    cardsAPI.deleteCard(cardsId)
        .then(() => {
            dispatch(getCardsThunk(cardsPack_id))
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
            dispatch(getCardsThunk(cardsPack_id))
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
            dispatch(setCardsAC(res.data.cards))
        })
}






