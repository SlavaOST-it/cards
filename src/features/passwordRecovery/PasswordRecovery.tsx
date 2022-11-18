import React, {useState} from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import style from "./PasswordRecovery.module.css"
import {sendEmailTC} from "./passRecovery-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hook";


type FormikErrorType = {
    email?: string
}
export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    const statusSendMessage = useAppSelector<boolean>(state => state.passRecovery.statusSendMessage)

    const [email, setEmail] = useState('')

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
            dispatch(sendEmailTC(values.email))
            setEmail(values.email)
            formik.resetForm()
        }
    })

    return (
        <div className={style.passRecoveryPage}>
            <div>
                <button><NavLink to={PATH.login}>Sign in</NavLink></button>
            </div>

            {!statusSendMessage
                ? (<div className={style.passRec}>
                    <h3>Forgot your password?</h3>
                    <form onSubmit={formik.handleSubmit}>
                        <input
                            id={"email"}
                            placeholder={"E-mail"}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}

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
                </div>)
                : (<CheckEmail email={email}/>)}
        </div>)
};


type CheckEmailType = {
    email: string
}
const CheckEmail = (props: CheckEmailType) => {
    return (
        <>
            <h2>Check Email</h2>
            <div>
                <img src={""} alt={"check Email"}/>
            </div>
            <div>
                <span>We’ve sent an Email with instructions to {props.email}</span>
            </div>
            <div>
                <button><NavLink to={PATH.login}>Back to login</NavLink></button>
            </div>
        </>
    )
}