import React, {useEffect} from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";
import {useAppDispatch, useAppSelector} from "./hooks";
import {initializeAppTC} from "./app-reducer";
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
            <Header/>
                {loadingStatus === 'loading' ? <LinearProgress/> : <div></div>}
            <Main/>
        </div>
    );
}

export default App;
