import React from 'react';
import {Navigate, NavLink, useParams} from "react-router-dom";
import {PATH} from "../../utils/routes/routes";
import {useFormik} from "formik";
import {useAppDispatch, useAppSelector} from "../../app/hook";
import {setNewPassTC} from "./newPass-reducer";

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
            <div>
                <h2>Create new password</h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <input
                    id={"password"}
                    placeholder={"new password"}
                    typeof={"password"}

                    {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password &&
                    <div style={{color: 'red'}}>{formik.errors.password}</div>}

                <div>Enter your email address and we will send you further instructions</div>
                <button
                    type={'submit'}
                    className={""}
                    disabled={formik.isSubmitting}
                >Create new password
                </button>
            </form>
        </div>
    );
};