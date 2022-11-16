import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from "./app-reducer";
import {passRecoveryReducer} from "../features/passwordRecovery/passRecovery-reducer";


const rootReducer = combineReducers({
    app: appReducer,
    passRecovery: passRecoveryReducer,
})

// ===== Принимаем типизацию всех редьюсеров ===== //
type ReduxActionType = AppActionType

export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// ===== Типизация Dispatch для Actions и Thunks ===== //
export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

// ===== Типизация того что возвращает нам Thunk ===== //
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
// window.store = store;