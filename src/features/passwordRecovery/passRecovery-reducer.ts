import {Dispatch} from "redux";
import axios, {AxiosError} from "axios";
import {forgotPassAPI} from "../../api/cards-api";

export type InfoMessageAT = ReturnType<typeof infoMessageAC>
export type PassRecoveryActionType = InfoMessageAT

const initialState = {
    infoMessage: '',

}
type InitialStateType = typeof initialState

export const passRecoveryReducer = (state: InitialStateType = initialState, action: PassRecoveryActionType) => {      // вместо any указать типизицию
    switch (action.type) {
        case "PassRECOVERY/passRecovery":
            return {
                ...state,
                infoMessage: action.infoMessage
            }
        default:
            return {...state}
    }
}
export const infoMessageAC = (infoMessage: string) => ({type: "PassRECOVERY/passRecovery", infoMessage} as const)
// export const sendNewPassAC = ()


// ======ThunkCreators ===== //
export const sendEmailTC = (email: string) => async (dispatch: Dispatch<PassRecoveryActionType>) => {
    try {
        let res = await forgotPassAPI.sendEmail(email)
        dispatch(infoMessageAC(res.info))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            alert(error)
        }
    }
}