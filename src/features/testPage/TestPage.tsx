import React from 'react';
import {SuperInput} from "../../common/components/input/SuperInput";
import {SuperCheckbox} from "../../common/components/checkbox/SuperCheckbox";
import {SuperButton} from "../../common/components/button/SuperButton";
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