import React, {useState} from 'react';
import {useFormik} from "formik";
import {NavLink} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import s from "./PasswordRecovery.module.css"
import {sendEmailTC} from "./passRecovery-reducer";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import TextField from "@mui/material/TextField";
import {CheckEmail} from "./checkEmail/CheckEmail";
import {useAppDispatch, useAppSelector} from "../../utils/hooks/hooks";


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
        <div className={s.passRecoveryPage}>

            {statusSendMessage
                ? (<CheckEmail email={email}/>)
                : (<div>
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
                            <div className={s.textInfo}>
                                Enter your email address and we will send you further instructions
                            </div>
                            <Button
                                type={'submit'}
                                variant={"contained"}
                                disabled={formik.isSubmitting}
                            >
                                Send Instructions
                            </Button>
                        </FormGroup>
                    </form>
                    <div className={s.textQuestion}>Did you remember your password?</div>

                    <div>
                        <NavLink to={PATH.login} className={s.link}>
                            Try logging in
                        </NavLink>
                    </div>
                </div>)}
        </div>)
};