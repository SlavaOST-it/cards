import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunkMiddleware, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {AppActionType, appReducer} from "./app-reducer";
import {authReducer, LoginActionType} from "../features/login/auth-reducer";
import {registerReducer} from '../features/registration/registration-reducer'
import {ProfileActionsType, profileReducer} from "../features/profile/profile-reducer";
import {PassRecoveryActionType, passRecoveryReducer} from "../features/passwordRecovery/passRecovery-reducer";
import {NewPassReducerActionType, setNewPassReducer} from "../features/newPassword/newPass-reducer";



const rootReducer = combineReducers({
    app: appReducer,
    login:authReducer,
    auth: registerReducer,
    profile: profileReducer,
    passRecovery: passRecoveryReducer,
    newPassword: setNewPassReducer,

})

// ===== Принимаем типизацию всех редьюсеров ===== //
type ReduxActionType = AppActionType|LoginActionType|ProfileActionsType | PassRecoveryActionType | NewPassReducerActionType


export type AppStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppRootStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>

// ===== Типизация Dispatch для Actions и Thunks ===== //
export type AppDispatchType = ThunkDispatch<RootState, unknown, ReduxActionType>

// ===== Типизация того что возвращает нам Thunk ===== //
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, ReduxActionType>
// @ts-ignore
window.store = store;