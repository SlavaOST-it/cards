import {authAPI} from "../api/cards-api";
import {Dispatch} from "redux";
import {setUserProfileAC} from "../features/profile/profile-reducer";
import axios, {AxiosError} from "axios";
import {loggedInAC} from "../features/login/auth-reducer";
// import {setIsLoggedInAC} from "../features/login/auth-reducer";

export type SetInitializedAT = ReturnType<typeof setInitializedAC>
export type setAppStatusAT = ReturnType<typeof setAppStatusAC>
export type AppActionType = SetInitializedAT | setAppStatusAT
export type AppStatusType = 'idle' | 'loading' | 'succeed' | 'failed'

const initialState = {
    status: 'idle' as AppStatusType,
    error: null,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        case "APP/SET-APP-STATUS":
            return {...state, status: action.status}
        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)
export const setAppStatusAC = (status: AppStatusType) => ({
    type: 'APP/SET-APP-STATUS' as const,
    status,
})


// ===== ThunkCreators ===== //
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    try {
        const res = await authAPI.me()


        dispatch(loggedInAC(true))
        dispatch(setInitializedAC(true))
        dispatch(setUserProfileAC(res))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(setInitializedAC(true))
            dispatch(setAppStatusAC('failed'))
            alert(error)
        }
    }
}

