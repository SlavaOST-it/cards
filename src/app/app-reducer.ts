import {authAPI} from "../api/cards-api";
import {Dispatch} from "redux";
import {setUserProfileAC} from "../features/profile/profile-reducer";
import axios, {AxiosError} from "axios";
// import {setIsLoggedInAC} from "../features/login/auth-reducer";

export type SetInitializedAT = ReturnType<typeof setInitializedAC>
export type AppActionType = SetInitializedAT

const initialState = {
    status: 'loading',
    error: null,
    isInitialized: false
}
type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionType) => {
    switch (action.type) {
        case "APP/SET-INITIALIZED":
            return {...state, isInitialized: action.value}
        default:
            return {...state}
    }
}

// ===== ActionCreators ===== //
export const setInitializedAC = (value: boolean) => ({type: "APP/SET-INITIALIZED", value} as const)


// ===== ThunkCreators ===== //
export const initializeAppTC = () => async (dispatch: Dispatch) => {
    try {
        const res = await authAPI.me()
        dispatch(setUserProfileAC(res));
        dispatch(setInitializedAC(true))
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

