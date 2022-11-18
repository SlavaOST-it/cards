import React from 'react'
import {useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {Navigate} from 'react-router-dom'
import {SuperButton} from '../../common/components/button/SuperButton'
import {SuperInput} from '../../common/components/input/SuperInput'
import {RegisterTC} from './registration-reducer'
import {AppStateType} from '../../app/store'
import {PATH} from '../../utils/routes/routes'

type FormikErrorType = {
    email?: string
    password?: string
    confirmPassword?: string
}
const Registration = () => {

    const dispatch = useDispatch()
    const isRegisterIn = useSelector<AppStateType, boolean>(state => state.auth.isRegisterIn)

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
            } else if (values.password.length < 4) {
                errors.email = 'To small password'
            }
            return errors
        },
        onSubmit: values => {
            // @ts-ignore
            dispatch(RegisterTC(values))
        },
    })
    if (isRegisterIn) {
        return <Navigate to={PATH.login}/>
    }
    return <form onSubmit={formik.handleSubmit}>
        <h2>Registration</h2>
        <div>
            <SuperInput
                placeholder={'email'}
                {...formik.getFieldProps('email')}
            />
        </div>
        <div>
            {formik.touched.email &&
                formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}

            <SuperInput placeholder={'password'}
                        {...formik.getFieldProps('password')}
            />
        </div>
        {formik.touched.password &&
            formik.errors.password &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>
        }
        <SuperInput
            placeholder={'confirmPassword'}
            {...formik.getFieldProps(' confirmPassword')}
        />
        {formik.touched.password &&
            formik.errors.password &&
            <div style={{color: 'red'}}>{formik.errors.password}</div>}
        <div>
            <button type="submit">
                Register
            </button>
        </div>
    </form>
}

export default Registration