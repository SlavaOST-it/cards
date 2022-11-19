import {authAPI} from "../../api/cards-api";
import {AppDispatchType} from "../../app/store";
import {setAppStatusAC, setInitializedAC} from "../../app/app-reducer";
import {setUserProfileAC} from "../profile/profile-reducer";


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

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType) => {      // вместо any указать типизицию
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
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatchType) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(loggedInAC(true))
            dispatch(setInitializedAC(true))
            dispatch(setUserProfileAC(res))
            dispatch(setAppStatusAC('succeed'))
        }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
        dispatch(setAppStatusAC('failed'))
        dispatch(passwordErrorAC(error))
        setTimeout(() => {
            dispatch(passwordErrorAC(''))
        }, 2000)
    })

}
