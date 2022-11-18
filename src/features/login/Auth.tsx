import React from 'react';
import {useFormik} from "formik";
import {SuperInput} from "../../common/components/input/SuperInput";
import style from './Auth.module.css'
import {SuperCheckbox} from "../../common/components/checkbox/SuperCheckbox";
import {loginThunkCreator} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Auth = () => {
    const dispatch=useAppDispatch()
    const loggedIn=useAppSelector(state=>state.login.loggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe:'false'
        },
        onSubmit: values => {
            dispatch((loginThunkCreator(values.email,values.password,JSON.parse(values.rememberMe))))
        },
        validate:values=>{
            const errors:FormikErrorType ={};
            if(!values.email){
                errors.email='Required'
            } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password){
                errors.password='Required'
            }else if(values.password.length<=8){
                errors.password='password length less than 8 characters'
            }else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.password = 'Invalid password'
            }
            return errors
        },
    })


    if(loggedIn){
       return <Navigate to={'/profile'}/>
    }
    return (
        <div className={style.container}>
            <div className={style.singIn}>Sing in</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={style.form}>
                    <SuperInput id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}/>
                    {formik.touched.email && formik.errors.email ? (
                        <div className={style.error}>{formik.errors.email}</div>
                    ) : null}
                    <input id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}/>
                    {formik.touched.password && formik.errors.password ? (
                        <div className={style.error}>{formik.errors.password}</div>
                    ) : null}
                    <div>
                        <SuperCheckbox id="rememberMe"
                                       name="rememberMe"
                                       type="checkbox"
                                       onChange={formik.handleChange}
                                       value={formik.values.rememberMe}
                        />Remember me
                    </div>
                    <button type='submit'>Sing in</button>
                </div>
            </form>
        </div>
    );
};