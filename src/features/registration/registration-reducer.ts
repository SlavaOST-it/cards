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
            return {isRegisterIn: action.value}
        default:
            return state
    }
}

export const RegisterTC = (data: RegisterType) => (dispatch: Dispatch) => {
    cardsAPI.register(data)
        .then((res) => {
            dispatch(setRegisterIn(true))
        })
}


