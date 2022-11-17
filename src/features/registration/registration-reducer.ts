import {Dispatch} from "redux"
import {cardsAPI} from '../../api/cards-api'

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
            return {...state, isRegisterIn: action.value}
        default:
            return state
    }
}

const setIsRegisterInAC = (value: boolean) => ({type: 'register/SET-IS-REGISTER-IN', value} as const)

export const RegisterTC = (data: RegisterType) => (dispatch: Dispatch) => {
    cardsAPI.register(data)
        .then((res) => {
            dispatch(setIsRegisterInAC(true))
        })
}


