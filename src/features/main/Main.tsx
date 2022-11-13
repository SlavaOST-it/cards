import React from 'react';
import {Route, Routes} from "react-router-dom";

import {PATH} from "../../utils/routes/routes";
import {TestPage} from "../testPage/TestPage";
import {Auth} from "../login/Auth";
import {Profile} from "../profile/Profile";
import {Registration} from "../registration/Registration";
import {Error404} from "../../common/components/errorPage/Error404";
import {PasswordRecovery} from "../passwordRecovery/PasswordRecovery";

export const Main = () => {
    return (
        <div className={""}>
            <Routes>
                <Route path={PATH.login} element={<Auth/>}/>
                <Route path={PATH.registration} element={<Registration/>}/>
                <Route path={PATH.profile} element={<Profile/>}/>
                <Route path={PATH.passwordRecovery} element={<PasswordRecovery/>}/>
                <Route path={PATH.enterNewPassword} element={<Registration/>}/>
                <Route path={PATH.test} element={<TestPage/>}/>
                <Route path={'/*'} element={<Error404/>}/>
            </Routes>
        </div>
    );
};