import React from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import style from "./PasswordRecovery.module.css"
import {sendEmailTC} from "./passRecovery-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../app/store";


type FormikErrorType = {
    email?: string
}
export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()               // заменить на свой хук
    const message = useSelector<AppRootStateType, string>(state => state.passRecovery.infoMessage)

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(sendEmailTC(values))
            formik.resetForm()
        }
    })

    return (
        <div className={style.passRecoveryPage}>
            <div>
                <button><NavLink to={PATH.login}>Sign in</NavLink></button>
            </div>
            <div className={style.passRec}>
                <h3>Forgot your password?</h3>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        id={"email"}
                        placeholder={"E-mail"}
                        name="email"
                        typeof="email"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <div>Enter your email address and we will send you further instructions</div>
                    <button
                        type={'submit'}
                        className={""}
                        disabled={formik.isSubmitting}
                    >Send Instructions
                    </button>
                </form>
                <span>Did you remember your password?</span>
                <NavLink to={PATH.login}>Try logging in</NavLink>
                {message}
            </div>
        </div>
    );
};
