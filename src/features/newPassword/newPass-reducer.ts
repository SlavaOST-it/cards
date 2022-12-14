import {forgotPassAPI} from "../../api/authAPI";
import {AppThunkType} from "../../app/store";
import {setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {baseErrorHandler} from "../../utils/error-utils/error-utils";
import {AxiosError} from "axios";

export type SetNewPassAT = ReturnType<typeof setNewPassAC>
export type NewPassReducerActionType = SetNewPassAT | SetAppStatusAT

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
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await forgotPassAPI.setNewPas(newPassword, token)
        dispatch(setNewPassAC(res.info))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        baseErrorHandler(e as Error | AxiosError, dispatch)
    }
}