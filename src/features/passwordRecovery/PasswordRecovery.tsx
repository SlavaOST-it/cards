import React, {useState} from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import style from "./PasswordRecovery.module.css"
import {sendEmailTC} from "./passRecovery-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import mailLogo from "../../assets/img/icons/mail.png"
import {Button, FormGroup, TextField} from "@mui/material";


type FormikErrorType = {
    email?: string
}
export const PasswordRecovery = () => {
    const dispatch = useAppDispatch()
    const statusSendMessage = useAppSelector(state => state.passRecovery.statusSendMessage)

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
            <div className={style.passRec}>
                {!statusSendMessage
                    ? (<div>
                        <h2>Forgot your password?</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    placeholder={"Email"}
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email &&
                                    <div style={{color: 'red'}}>{formik.errors.email}</div>}
                                <div className={style.textInfo}>Enter your email address and we will send you further
                                    instructions
                                </div>
                                <Button
                                    type={'submit'}
                                    variant={'outlined'}
                                    disabled={formik.isSubmitting}
                                >
                                    Send Instructions
                                </Button>
                            </FormGroup>
                        </form>
                        <div className={style.textQuestion}>Did you remember your password?</div>

                        <div className={style.link}><NavLink to={PATH.login}>Try logging in</NavLink></div>
                    </div>)
                    : (<CheckEmail email={email}/>)}
            </div>
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
                <img src={mailLogo} alt={"mail"}/>
            </div>
            <div className={style.textInfo}>
                We’ve sent an Email with instructions to {props.email}
            </div>
            <div>
                <Button
                    variant={'contained'}
                    color={'primary'}
                >
                    <a href={PATH.login}>Back to login</a>
                </Button>
            </div>
        </>
    )
}