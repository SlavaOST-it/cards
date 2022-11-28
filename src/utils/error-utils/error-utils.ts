import axios, {AxiosError} from "axios";
import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {Dispatch} from "redux";


export const baseErrorHandler = (e: any, dispatch: Dispatch<SetAppErrorAT | SetAppStatusAT>) =>{
    const err = e as Error | AxiosError
    if (axios.isAxiosError(err)) {
        const error = err.response?.data
            ? (err.response.data as ({ error: string })).error
            : err.message
        dispatch(setAppStatusAC('failed'))
        dispatch(setAppErrorAC(error))
}}