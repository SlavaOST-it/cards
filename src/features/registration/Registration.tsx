import React from 'react'
import {useFormik} from 'formik'
import {Navigate} from 'react-router-dom'
import {RegisterTC} from './registration-reducer'
import {PATH} from '../../utils/routes/routes'
import {useAppDispatch, useAppSelector} from '../../utils/hooks/hooks'
import {Button, TextField} from '@mui/material'
import s from './Registration.module.css'

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}
const Registration = () => {

    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const isInitialized = useAppSelector((state) => {
        return state.app.isInitialized
    })
    const dispatch = useAppDispatch()
    const isRegisterIn = useAppSelector(state => state.auth.isRegisterIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Password must not be a null'
            } else if (values.password.length < 8) {
                errors.email = 'To small password'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(RegisterTC(values))
        },
    })
    if (isRegisterIn) {
        return <Navigate to={PATH.login}/>
    }

    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }
    return <form onSubmit={formik.handleSubmit}>
        <h2>Registration</h2>
        <div>
            <TextField sx={{m:1}} id="outlined-basic" label="Email" variant="outlined" size="small"
                       {...formik.getFieldProps('email')}/>
        </div>
        <div className={s.input}>
            {formik.touched.email &&
                formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}

            <TextField sx={{m:1}} id="outlined-basic" label="Password" variant="outlined" size="small"
                       {...formik.getFieldProps('password')}/>
        </div>
        {formik.touched.password &&
            formik.errors.password &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>
        }
        <TextField sx={{m:1}} id="outlined-basic" label="Confirm password" variant="outlined" size="small"
                   {...formik.getFieldProps('confirmPassword')}/>
        {formik.touched.password &&
            formik.errors.password &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        <div>
            <Button variant="outlined" type="submit" sx={{width: 234, marginTop: 2}}>Register</Button>
        </div>
    </form>
}

export default Registration