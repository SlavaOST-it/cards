import React from 'react';
import './App.css';
import {Main} from "../features/main/Main";
import {Header} from "../features/header/Header";

const App = () => {
    return (
        <div className="App">
            <Header/>
            <Main/>
        </div>
    );
}

export default App;
