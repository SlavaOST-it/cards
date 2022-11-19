import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../utils/routes/routes";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";

const App = () => {
/*    const isInitialized = useAppSelector((state) => {
        return state.app.isInitialized})
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])


if (!isInitialized) {
    return <Navigate to={PATH.registration}/>}*/

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
            <Main/>
        </div>
    );
}

export default App;
