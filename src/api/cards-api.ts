import axios from "axios"
import {RegisterType} from '../features/registration/registration-reducer'

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export type RegisterResponseType = {
    addedUser: {}
    error?: string;
}

export const cardsAPI = {
    register(data: RegisterType) {
        return instance.post<RegisterResponseType>('auth/register', data)
    }
}