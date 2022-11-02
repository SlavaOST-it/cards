import React from 'react';
import {SuperInput} from "../common/input/SuperInput";
import {SuperCheckbox} from "../common/checkbox/SuperCheckbox";
import {SuperButton} from "../common/button/SuperButton";
import style from "./TestPage.module.css"

export const TestPage = () => {
    return (
        <div className={style.testPage}>
            <SuperInput/>
            <SuperCheckbox>Test checkbox</SuperCheckbox>
            <SuperButton title={'test button'}/>
        </div>
    );
};