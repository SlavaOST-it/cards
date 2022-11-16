import {Dispatch} from "redux"
import {cardsAPI} from '../../api/cards-api'

type RegisterType = {
    email: string
    password: string

}

const initialState = {
    isRegisterIn: false
}

export const registerReducer = (state: InitialStateType = initialState, action: ): InitialStateType => {
    switch (action.type) {
        case "register/SET-IS-REGISTER-IN":
            return {...state, isRegisterIn: action.value}
        default:
            return state
    }
}

//actions
export const setIsRegisterInAC = (value: boolean) => ({type: 'register/SET-IS-REGISTER-IN', value} as const)
//thunks
export const registerTC = (data: RegisterType) => (dispatch: Dispatch) => {
    cardsAPI.register(data)
        .then((res) => {
            dispatch(setIsRegisterInAC(true))
        })
}
//types
type InitialStateType = typeof initialState
