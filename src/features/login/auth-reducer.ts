import {authAPI} from "../../api/cards-api";
import {AppDispatchType, AppThunkType} from "../../app/store";
import {setInitializedAC} from "../../app/app-reducer";
import {setUserProfileAC} from "../profile/profile-reducer";
import axios, {AxiosError} from "axios";


const initialState = {
    data: {
        email: '',
        rememberMe: false,
        name: '',
        publicCardPacksCount: 0
    },
    loggedIn: false,
    passwordError: ''
}
type InitialStateType = typeof initialState
export type LoginActionType = loggedInACType | passwordErrorACType

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType): InitialStateType => {      // вместо any указать типизицию
    switch (action.type) {
        case "LOGGED_IN": {
            return {...state, loggedIn: action.loggedIn}
        }
        case "PASSWORD_ERROR": {
            return {...state, passwordError: action.error}
        }
        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
type loggedInACType = ReturnType<typeof loggedInAC>
export const loggedInAC = (loggedIn: boolean) => {
    return {type: "LOGGED_IN", loggedIn} as const
}

type passwordErrorACType = ReturnType<typeof passwordErrorAC>
export const passwordErrorAC = (error: string) => {
    return {type: "PASSWORD_ERROR", error} as const
}

// ===== ThunkCreators ===== //
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean): AppThunkType => async (dispatch) => {
    try {
        const res = await authAPI.login(email, password, rememberMe)
        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(passwordErrorAC(error))
            setTimeout(() => {
                dispatch(passwordErrorAC(''))
            }, 2000)
        }
    }
}

export const logoutThunkCreator = (): AppThunkType => async (dispatch) => {
    await authAPI.logout()
    try {
        dispatch(loggedInAC(false))
    } catch (e) {

    }
}

