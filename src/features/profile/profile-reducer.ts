import axios, {AxiosError} from "axios";
import {Dispatch} from "redux";
import {profileAPI} from "../../api/cards-api";
import {setAppStatusAC, setAppStatusAT} from "../../app/app-reducer";

export type SetUserProfileAT = ReturnType<typeof setUserProfileAC>
export type SetUserNameAC = ReturnType<typeof setUserNameAC>
export type SetUserStatusAT = ReturnType<typeof setUserStatusAC>
export type SetUserPhotoAT = ReturnType<typeof setUserPhotoAC>
export type ProfileActionsType = SetUserProfileAT | SetUserNameAC | SetUserStatusAT | SetUserPhotoAT | setAppStatusAT

type InitialStateType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string | null;
    rememberMe: boolean;
}
const initialState: InitialStateType = {
    _id: '',
    email: '',
    name: 'test name',
    avatar: '',
    rememberMe: false,
}

export const profileReducer = (state: InitialStateType = initialState, action: ProfileActionsType) => {      // вместо any указать типизицию
    switch (action.type) {
        case "PROFILE/SET-USER-PROFILE":
            return action.profile
        case "PROFILE/SET-USER-NAME":
            return {
                ...state,
                name: action.userName
            }
        case "PROFILE/SET-USER-PHOTO":
            return {
                ...state,
                avatar: action.photo
            }
        default:
            return {...state}
    }
}
// ==================ACTION CREATORS =======================//
export const setUserProfileAC = (profile: any) => ({type: "PROFILE/SET-USER-PROFILE", profile} as const)
export const setUserNameAC = (userName: string) => ({type: "PROFILE/SET-USER-NAME", userName} as const)
export const setUserStatusAC = (status: string) => ({type: "PROFILE/SET-USER-STATUS", status} as const)
export const setUserPhotoAC = (photo: string) => ({type: "PROFILE/SET-USER-PHOTO", photo} as const)

// ==================THUNK CREATORS =======================//
// export const getUserProfileThunkCreator = () => async (dispatch: Dispatch<ProfileActionsType>) =>{
//     try {
//         let res = await auth.loginez()
//         dispatch(setUserProfileAC(res))
//     }
//     catch (e) {
//         const err = e as Error | AxiosError
//         if (axios.isAxiosError(err)) {
//             const error = err.response?.data
//                 ? (err.response.data as ({ error: string })).error
//                 : err.message
//             alert(error)
//         }
//     }
// }

export const changeNameThunkCreator = (newName: string) => async (dispatch: Dispatch<ProfileActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await profileAPI.changeName(newName)
        dispatch(setUserNameAC(res.updatedUser.name))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(setAppStatusAC('failed'))
            alert(error)
        }
    }
}
export const changeAvatarThunkCreator = (avatar: string) => async (dispatch: Dispatch<ProfileActionsType>) => {
    dispatch(setAppStatusAC('loading'))
    try {
        let res = await profileAPI.updatePhoto(avatar)
        dispatch(setUserPhotoAC(res.updatedUser.avatar))
        dispatch(setAppStatusAC('succeed'))
    } catch (e) {
        const err = e as Error | AxiosError
        if (axios.isAxiosError(err)) {
            const error = err.response?.data
                ? (err.response.data as ({ error: string })).error
                : err.message
            dispatch(setAppStatusAC('failed'))
            alert(error)
        }
    }
}