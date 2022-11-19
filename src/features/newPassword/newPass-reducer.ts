import axios, {AxiosError} from "axios";
import {forgotPassAPI} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";

export type SetNewPassAT = ReturnType<typeof setNewPassAC>
export type NewPassReducerActionType = SetNewPassAT

const initialState = {
    infoMessage: '',
    statusChangePass: false
}
type InitialStateType = typeof initialState

export const setNewPassReducer = (state: InitialStateType = initialState, action: NewPassReducerActionType):InitialStateType => {
    switch (action.type) {
        case "NEW_PASS/SET_NEW_PASS":
            return {
                ...state,
                infoMessage: action.infoMessage,
                statusChangePass: true
            }
        default:
            return {...state}
    }
}

// ===== Action Creators ===== //
export const setNewPassAC = (infoMessage: string) => ({type: "NEW_PASS/SET_NEW_PASS", infoMessage} as const)

// ===== Thunk Creators ===== //
export const setNewPassTC = (newPassword: string, token: string | undefined): AppThunkType => async (dispatch) => {
    try {
        let res = await forgotPassAPI.setNewPas(newPassword, token)
        dispatch(setNewPassAC(res.info))
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