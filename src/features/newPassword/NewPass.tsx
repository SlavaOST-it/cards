import React from 'react';
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setNewPassTC} from "./newPass-reducer";
import style from "../passwordRecovery/PasswordRecovery.module.css";
import {Button, FormGroup, TextField} from "@mui/material";

type FormikErrorType = {
    password?: string
}
export const NewPass = () => {
    const dispatch = useAppDispatch()
    const statusChangePass = useAppSelector<boolean>(state => state.newPassword.statusChangePass)
    const {token} = useParams<string>()

    const formik = useFormik({
        initialValues: {
            password: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.password) {
                errors.password = 'Password must not be a null'
            } else if (values.password.length < 4) {
                errors.password = 'Password lengths minimum 4 symbols'
            }
            return errors
        },
        onSubmit: (values) => {
            dispatch(setNewPassTC(values.password, token))
            formik.resetForm()
        }
    })

    if (statusChangePass) {
        return <Navigate to={PATH.login}/>
    }
    return (
        <div>
            <div>
                <button><NavLink to={PATH.login}>Sign in</NavLink></button>
            </div>

            <div className={style.passRec}>
                <h2>Create new password</h2>


                <form onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            id={"password"}
                            type="password"
                            label="Password"
                            placeholder={"new password"}
                            typeof={"password"}


                            {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password &&
                            <div style={{color: 'red'}}>{formik.errors.password}</div>}

                        <div className={style.textInfo}>Enter your email address and we will send you further
                            instructions
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
        </div>
    );
};