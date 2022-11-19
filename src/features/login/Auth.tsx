import React from 'react';
import {useFormik} from "formik";
import style from './Auth.module.css'
import {loginThunkCreator} from "./auth-reducer";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {Navigate, NavLink} from "react-router-dom";
import {
    Alert,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup, Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    TextField
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {PATH} from "../../utils/routes/routes";


type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
type InputPasswordType = 'text' | 'password'

export const Auth = () => {
    const dispatch = useAppDispatch()
    const loggedIn = useAppSelector(state => state.login.loggedIn)
    const passwordError = useAppSelector(state => state.login.passwordError)
    const [inputPassword, setInputPassword] = React.useState<InputPasswordType>('text');

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: values => {
            dispatch((loginThunkCreator(values.email, values.password, values.rememberMe)))
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
            } else if (values.password.length <8) {
                errors.password = 'password length less than 8 characters'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.password = 'Invalid password'
            }
            return errors
        },
    })

    const showPasswordHandler = () => {
        setInputPassword('text')
    };

    const hidePasswordHandler = () => {
        setInputPassword('password')
    };

    if (loggedIn) {
        return <Navigate to={PATH.profile}/>
    }
    return (
        <Grid container justifyContent={'center'}>
            <Grid item justifyContent={'center'}>
                <div className={style.singIn}>Sing in</div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={style.form}>
                        <FormControl>
                            <FormGroup>
                                <TextField
                                    sx={{m: 1, width: '25ch'}}
                                    label="Email"
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                    helperText={formik.errors.email}
                                    error={!!(formik.touched.email && formik.errors.email)}
                                />
                                {/*<TextField id="email"
                               name="email"
                               type="email"
                               onBlur={formik.handleBlur}
                               onChange={formik.handleChange}
                               value={formik.values.email}
                               required
                               label="Email"
                               defaultValue="Hello World"
                        error={formik.touched.email && formik.errors.email ? formik.errors.email : ''}
                    />*/}

                                {/*       <TextField type="password" label="Password"
                                   margin="normal" {...formik.getFieldProps('password')}

                            id="outlined-password-input"
                                            name="password"
                                            type="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                            error={formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                             label="Password"
                             autoComplete="current-password"
                        />*/}
                                <FormControl sx={{m: 1, width: '25ch'}} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        type={inputPassword}
                                        {...formik.getFieldProps('password')}
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
                                        label="Password"
                                    />
                                </FormControl>
                                {passwordError && <div className={style.error}>{passwordError}</div>}
                                <div className={style.checkbox}>
                                    <FormControlLabel control={<Checkbox name={'rememberMe'} onChange={formik.handleChange}
                                                                         value={formik.values.rememberMe}/>}
                                                      label="Remember me"/>
                                </div>
                                <NavLink className={style.forgot} to={PATH.passwordRecovery}>Forgot Password?</NavLink>
                                <Button variant="contained" type='submit'>Sing in</Button>
                                <div className={style.text}>Already have an account?</div>
                                <NavLink className={style.signUp} to={PATH.registration}>Sign up</NavLink>
                                {/*<Alert sx={{}} variant="filled" severity="error">
                                This is an error alert — check it out!
                            </Alert>*/}
                            </FormGroup>
                        </FormControl>
                    </div>
                </form>
            </Grid>
        </Grid>
   /* <div className={style.container}>


    </div>*/
)
    ;
};
