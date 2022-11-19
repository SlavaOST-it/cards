import axios, {AxiosError} from "axios";
import {forgotPassAPI} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";

export type InfoMessageAT = ReturnType<typeof infoMessageAC>
export type StatusSendMessageAT = ReturnType<typeof statusSendMessageAC>
export type PassRecoveryActionType = InfoMessageAT | StatusSendMessageAT

const initialState = {
    textMessage: '',
    statusSendMessage: false
}
type InitialStateType = typeof initialState

export const passRecoveryReducer = (state: InitialStateType = initialState, action: PassRecoveryActionType) => {
    switch (action.type) {
        case "PassRECOVERY/passRecovery":
            return {
                ...state,
                infoMessage: action.infoMessage
            }
        case "PssRECOVERY/CHANGE-STATUS-SEND-MESSAGE":
            return {
                ...state,
                statusSendMessage: true
            }
        default:
            return {...state}
    }
}
// ======ActionCreators ===== //
export const infoMessageAC = (infoMessage: string) => ({type: "PassRECOVERY/passRecovery", infoMessage} as const)
export const statusSendMessageAC = (status: boolean) => ({
    type: "PssRECOVERY/CHANGE-STATUS-SEND-MESSAGE",
    status
} as const)

// ======ThunkCreators ===== //
export const sendEmailTC = (email: string):AppThunkType => async (dispatch) => {
    try {
        let res = await forgotPassAPI.sendEmail(email)
        dispatch(infoMessageAC(res.info))
        dispatch(statusSendMessageAC(true))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(infoMessageAC(error))
        }
    }
}