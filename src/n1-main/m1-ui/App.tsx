import React from 'react';
import './App.css';
import {Main} from "./main/Main";
import {HeaderContainer} from "./header/nav/HeaderContainer";


const App = () => {
    return (
        <div className="App">
            <HeaderContainer/>
            <Main/>
        </div>
    );
}

export default App;
