import React from 'react';
import {useFormik} from "formik";
import style from './Auth.module.css'
import {SuperCheckbox} from "../../common/components/checkbox/SuperCheckbox";
import {loginThunkCreator} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate} from "react-router-dom";
import SuperInputText from "../../common/components/superInput/SuperInputText";
import SuperButton from "../../common/components/superButton/SuperButton";
import SuperInputPassword from "../../common/components/superInput/SuperInputPassword";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Auth = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const passwordError = useAppSelector(state => state.login.passwordError)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch((loginThunkCreator(values.email, values.password, values.rememberMe)))
            formik.resetForm()
        },
        validate: values => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length <= 8) {
                errors.password = 'password length less than 8 characters'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.password = 'Invalid password'
            }
            return errors
        },
    })


    if (loggedIn) {
        return <Navigate to={'/profile'}/>
    }
    return (
        <div className={style.container}>
            <div className={style.singIn}>Sing in</div>
            <form onSubmit={formik.handleSubmit}>
                <div className={style.form}>
                    <SuperInputText id="email"
                                    name="email"
                                    type="email"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    />
                    <SuperInputPassword id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                    />
                    {passwordError && <div className={style.error}>{passwordError}</div>}
                    <div>
                        <SuperCheckbox id="rememberMe"
                                       name="rememberMe"
                                       type="checkbox"
                                       onChange={formik.handleChange}
                                       checked={formik.values.rememberMe}
                        />Remember me
                    </div>
                    <SuperButton type='submit'>Sing in</SuperButton>
                </div>
            </form>
        </div>
    );
};