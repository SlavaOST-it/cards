import {authAPI} from '../../api/authAPI'
import {setAppErrorAC, setAppStatusAC} from "../../app/app-reducer";
import {AppThunkType} from "../../app/store";
import axios, {AxiosError} from "axios";

export type SetRegisterInType = ReturnType<typeof setRegisterIn>
export type RegisterType = {
    email: string
    password: string
}

const initialState = {
    isRegisterIn: false
}

type InitialStateType = typeof initialState

export const registerReducer = (state: InitialStateType = initialState, action: SetRegisterInType): InitialStateType => {
    switch (action.type) {
        case "REGISTER/SET_REGISTER_IN":
            return {isRegisterIn: action.value}
        default:
            return state
    }
}

// ===== Action Creators ===== //
export const setRegisterIn = (isRegisterIn: boolean) => {
    return {
        type: "REGISTER/SET_REGISTER_IN",
        value: isRegisterIn
    } as const
}

// ===== Thunk Creators ===== //
export const RegisterTC = (data: RegisterType): AppThunkType => async (dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.register(data)
        dispatch(setRegisterIn(true))
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


