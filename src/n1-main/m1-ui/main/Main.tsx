import React from 'react';
import {Route, Routes} from "react-router-dom";
import {
    enterNewPasswordRoute,
    loginRoute,
    passwordRecoveryRoute,
    profileRoute,
    registerRoute,
    testRoute
} from "../routes/routes";
import {LoginContainer} from "../login/LoginContainer";
import {ProfileContainer} from "../profile/ProfileContainer";
import {RegisterContainer} from "../register/RegisterContainer";
import {Error404Container} from "../errorPage/Error404Container";
import {PasswordRecoveryContainer} from "../passwordRecovery/PasswordRecoveryContainer";
import {TestPage} from "../testPage/TestPage";

export const Main = () => {
    return (
        <div className={""}>
            <Routes>
                <Route path={loginRoute} element={<LoginContainer/>}/>
                <Route path={profileRoute} element={<ProfileContainer/>}/>
                <Route path={registerRoute} element={<RegisterContainer/>}/>
                <Route path={passwordRecoveryRoute} element={<PasswordRecoveryContainer/>}/>
                <Route path={enterNewPasswordRoute} element={<RegisterContainer/>}/>
                <Route path={testRoute} element={<TestPage/>}/>
                <Route path={'/*'} element={<Error404Container/>}/>
            </Routes>
        </div>
    );
};