import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";
import {Navigate} from "react-router-dom";
import {PATH} from "../utils/routes/routes";
import {ErrorSnackbar} from "../common/components/ErrorSnackbar/ErrorSnackbar";
import {CircularProgress, LinearProgress} from "@mui/material";

const App = () => {
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const dispatch = useAppDispatch()
    const loadingStatus = useAppSelector((state) => state.app.status)

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    if (!isInitialized) {
        return <div style={{marginBottom: 40,position: 'fixed', top: '60%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }

    return (
        <div className="App">
            <ErrorSnackbar/>
            <Header/>
                {loadingStatus === 'loading' ? <LinearProgress/> : <div></div>}
            <Main/>
        </div>
    );
}

export default App;
