import {authAPI} from "../../api/cards-api";
import {AppDispatchType} from "../../app/store";
import {setInitializedAC} from "../../app/app-reducer";
import {setUserProfileAC} from "../profile/profile-reducer";


const initialState = {
    data: {
        email: '',
        rememberMe: false,
        name: '',
        publicCardPacksCount: 0
    },
    loggedIn: false
}
type InitialStateType = typeof initialState
export type LoginActionType = loggedInACType

export const authReducer = (state: InitialStateType = initialState, action: LoginActionType) => {      // вместо any указать типизицию
    switch (action.type) {
        case "LOGGED_IN": {
            return {...state, loggedIn: action.loggedIn}
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

// ===== ThunkCreators ===== //
export const loginThunkCreator = (email: string, password: string, rememberMe: boolean) => (dispatch: AppDispatchType) => {
    authAPI.login(email, password, rememberMe)
        .then(res => {
            dispatch(loggedInAC(true))
            dispatch(setInitializedAC(true))
            dispatch(setUserProfileAC(res))
        }).catch(e => {
        const error = e.response
            ? e.response.data.error
            : (e.message + ', more details in the console')
    })
}