import React from 'react';
import {useNavigate} from "react-router-dom";
import style from "./Error404.module.css"
import {SuperButton} from "../common/button/SuperButton";

export const Error404 = () => {
    const navigate = useNavigate()
    return (
        <div className={style.error_page}>
            <div className={style.error_404}>Ooops... Error 404</div>
            <div className={style.error_text}>Sorry, but the page you are looking for doesn't exist.</div>
            <SuperButton title={'BACK'}
                         callBack={() => {navigate(-1)}} disable={false} className={style.error_btn}/>
            <div>
                <img className={style.error_img} src={'https://cdn.wallpapersafari.com/84/92/kiyMfq.jpg'}
                     alt={"error-img"}/>
            </div>
        </div>
    );
};