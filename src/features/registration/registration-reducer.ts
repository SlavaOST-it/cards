import {Dispatch} from "redux"
import {authAPI} from '../../api/cards-api'
import {setAppStatusAC} from "../../app/app-reducer";

export type RegisterType = {
    email: string
    password: string
}

const initialState = {
    isRegisterIn: false
}

type InitialStateType = typeof initialState

export type SetRegisterInType = ReturnType<typeof setRegisterIn>

const setRegisterIn = (isRegisterIn: boolean) => {
    return {
        type: "register/SET-REGISTER-IN",
        value: isRegisterIn
    } as const
}

export const registerReducer = (state: InitialStateType = initialState, action: SetRegisterInType): InitialStateType => {
    switch (action.type) {
        case "register/SET-REGISTER-IN":
            return {isRegisterIn: action.value}
        default:
            return state
    }
}

export const RegisterTC = (data: RegisterType) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC('loading'))
    authAPI.register(data)
        .then((res) => {
            dispatch(setRegisterIn(true))
            dispatch(setAppStatusAC('succeed'))
        })
}


