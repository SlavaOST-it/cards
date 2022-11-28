import React from 'react';
import {Navigate, useParams} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setNewPassTC} from "./newPass-reducer";
import s from "../passwordRecovery/PasswordRecovery.module.css";
import Button from "@mui/material/Button";
import FormGroup from "@mui/material/FormGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import {FormControl, IconButton, InputAdornment, InputLabel} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

type FormikErrorType = {
    password?: string
}

type InputPasswordType = 'text' | 'password'

export const NewPass = () => {
    const dispatch = useAppDispatch()
    const statusChangePass = useAppSelector<boolean>(state => state.newPassword.statusChangePass)
    const {token} = useParams<string>()

    const [inputPassword, setInputPassword] = React.useState<InputPasswordType>('text');

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Password must not be a null'
            } else if (values.password.length < 8) {
                errors.password = 'Password lengths minimum 8 symbols'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(setNewPassTC(values.password, token))
            formik.resetForm()
        }
    })

    const showPasswordHandler = () => {
        setInputPassword('text')
    }

    const hidePasswordHandler = () => {
        setInputPassword('password')
    }

    if (statusChangePass) {
        return <Navigate to={PATH.login}/>
    }

    return (
        <div className={s.passRec}>
            <h2>Create new password</h2>

            <form onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            type={inputPassword}
                            label="Password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={showPasswordHandler}
                                        onMouseDown={hidePasswordHandler}
                                        edge="end"
                                    >
                                        {inputPassword === 'text' ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                            }
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div className={s.error}>{formik.errors.password}</div>}
                    </FormControl>

                    <div className={s.textInfo}>
                        Create new password and we will send you further instructions to email
                    </div>

                    <Button
                        type={'submit'}
                        variant={'outlined'}
                        disabled={formik.isSubmitting}
                    >
                        Create new password
                    </Button>
                </FormGroup>
            </form>
        </div>
    );
};