import {AppThunkType} from '../../app/store'
import {setAppStatusAC} from '../../app/app-reducer'
import {CardResponseType, cardsAPI, CardsType} from '../../api/cardsAPI'
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";

type setCardsType = ReturnType<typeof setCardsAC>
type setSearchCardsType = ReturnType<typeof setSearchCardsAC>
type sortCardsType = ReturnType<typeof sortCardsAC>
type setPageCardsAC = ReturnType<typeof setPageCardsAC>
type setPageCardsCountType = ReturnType<typeof setPageCardsCountAC>
type setCardsTotalCountType = ReturnType<typeof setCardsTotalCountAC>
type setCardIdType = ReturnType<typeof setCardIdAC>
type setFormatType = ReturnType<typeof setFormatAC>
type setQuestionCoverType = ReturnType<typeof setQuestionCoverAC>
type setAnswerCoverType = ReturnType<typeof setAnswerCoverAC>

export type CardsActionsType =
    setCardsType
    | setSearchCardsType
    | sortCardsType
    | setPageCardsAC
    | setPageCardsCountType
    | setCardsTotalCountType
    | setCardIdType
    | setFormatType
    | setQuestionCoverType
    | setAnswerCoverType

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
    selected: boolean
    cardId: string
    format: string
    answerCover: string
    questionCover: string
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
    selected: true,
    cardId: '',
    format: "string",
    answerCover: '',
    questionCover: ''
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
        case "CARDS/SET_SEARCH_CARDS":
            return {...state, cardQuestion: action.search}
        case "CARDS/SORT_CARDS":
            return {...state, sortCards: action.sort, selected: action.selected}
        case "CARDS/SET_PAGE_CARDS":
            return {...state, page: action.page}
        case "CARDS/SET_PAGE_CARDS_COUNT":
            return {...state, pageCount: action.pageCount}
        case "CARDS/SET_PAGE_TOTAL_COUNT":
            return {...state, cardsTotalCount: action.totalCount}
        case "CARDS/SET_CARD_ID":
            return {...state, cardId: action.cardId}
        case "CARDS/SET_FORMAT":
            return {...state, format: action.format}
        case "CARDS/SET_QUESTION_IMG":
            return {...state, questionCover: action.questionCover}
        case "CARDS/SET_ANSWER_IMG":
            return {...state, answerCover: action.answerCover}
        default:
            return state
    }
}

export const setCardsAC = (data: CardResponseType[]) => ({type: 'CARDS/SET-CARDS', payload: {data}} as const)

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
export const setCardIdAC = (cardId: string) => {
    return {type: "CARDS/SET_CARD_ID", cardId} as const
}
export const setFormatAC = (format: string) => {
    return {type: "CARDS/SET_FORMAT", format} as const
}
export const setQuestionCoverAC = (questionCover: string) => {
    return {type: "CARDS/SET_QUESTION_IMG", questionCover} as const
}
export const setAnswerCoverAC = (answerCover: string) => {
    return {type: "CARDS/SET_ANSWER_IMG", answerCover} as const
}

export const getCardsThunk = (packId: string): AppThunkType => async (dispatch, getState) => {
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
    } catch (e) {
        return baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const addCardThunk = (cardsPack_id: string, question: string, answer: string,questionImg:string,answerImg:string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        if(question.length>0){
            await cardsAPI.sendCard({cardsPack_id, question, answer})
        }
        if(questionImg.length>0){
            await cardsAPI.sendCard({cardsPack_id,questionImg,answerImg})
            dispatch(setQuestionCoverAC(''))
            dispatch(setAnswerCoverAC(''))
        }
        dispatch(getCardsThunk(cardsPack_id))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const deleteCardThunk = (cardsPack_id: string, cardsId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        await cardsAPI.deleteCard(cardsId)
        dispatch(getCardsThunk(cardsPack_id))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const changeCardThunk = (
    cardsPack_id: string,
    _id: string,
    newQuestion: string,
    newAnswer: string,
    answerImg:string,
    questionImg:string,
    comment?: string,
): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
            await cardsAPI.updateCard({_id: _id, question: newQuestion, answer: newAnswer, questionImg,answerImg,comments: comment})
        dispatch(getCardsThunk(cardsPack_id))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}

export const learnCardsThunk = (packUserId: string): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
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
        const res = await cardsAPI.getCards(data)
        dispatch(setCardsAC(res.data.cards))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }

}






