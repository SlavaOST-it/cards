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
export const forgotPassAPI = {
    sendEmail(email: string) {
        return axios.post(`https://neko-back.herokuapp.com/2.0/auth/forgot`,
            {
                email: email,
                message: "`<h3>password recovery link: <a href='http://localhost:3000/#/setNewPass/$token$'>link</a></h3>`"
            })
            .then(res => res.data)
    },
    setNewPas(newPass: string, token:  string | undefined) {
        return instance.post(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, {
            password: newPass,
            resetPasswordToken: token
        }).then(res => res.data)
    }
}