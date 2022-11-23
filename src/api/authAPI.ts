import axios from "axios"
import {RegisterType} from '../features/registration/registration-reducer'
import {CardsPackType} from "../features/packList/packList-reducer";

export const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/' ,
    baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})


export const authAPI = {
    me() {
        return instance.post('auth/me').then(res => res.data)
    },
    login: (email: string, password: string, rememberMe: boolean) => {
        return instance.post<LoginResponseType>('auth/login', {
            email: email,
            password: password,
            rememberMe: rememberMe
        })
            .then(res => res.data)
    },
    logout: () => {
        return instance.delete('/auth/me')
    },
    register(data: RegisterType) {
        return instance.post<RegisterResponseType>('auth/register', data)
    },

}
export const packsAPI={
    getCardPacks(page:number,pageCount:number, sort:string, search:string, my_id:string,minCardsCount:number,maxCardsCount:number){
        return instance.get<CardPacksResponseType>('cards/pack',{params:{pageCount:pageCount, sortPacks:sort, packName:search, user_id:my_id,min:minCardsCount,max:maxCardsCount,page:page}})
    }
}
export const profileAPI = {
    changeName(newName: string) {
        return instance.put(`/auth/me`, {name: newName})
            .then(res => res.data)
    },
    updatePhoto(avatar: string) {
        return instance.put(`/auth/me` + avatar)
            .then(res => res.data)
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
    setNewPas(newPass: string, token: string | undefined) {
        return axios.post(`https://neko-back.herokuapp.com/2.0/auth/set-new-password`, {
            password: newPass,
            resetPasswordToken: token
        }).then(res => res.data)
    }
}


//types response
export type RegisterResponseType = {
    addedUser: {}
    error?: string;
}

type LoginResponseType = {
    _id: string,
    email: string,
    name: string,
    rememberMe: boolean,
    publicCardPacksCount: number
}
type CardPacksResponseType={
    cardPacks: CardsPackType[],
    page: number,
    pageCount: number,
    sort:string,
    search:string,
    isMyPacks:boolean,
    minCardsCount:number,
    maxCardsCount:number,
    cardPacksTotalCount:number
}
