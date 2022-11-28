import mailLogo from "../../../assets/img/icons/mail.png";
import s from "./CheckEmail.module.css";
import {Link} from "react-router-dom";
import {PATH} from "../../../utils/routes/routes";
import Button from "@mui/material/Button";
import React from "react";


type CheckEmailType = {
    email: string
}
export const CheckEmail = (props: CheckEmailType) => {
    return (
        <div>
            <h2>Check Email</h2>
            <div>
                <img src={mailLogo} alt={"mail"}/>
            </div>
            <div className={s.textInfo}>
                We’ve sent an Email with instructions to
                <div className={s.textInfo_email}>{props.email}</div>
            </div>
            <div>
                <Link to={PATH.login} className={s.backToLoginBTN}>
                    <Button type="submit" variant="contained">
                        Back to login
                    </Button>
                </Link>
            </div>
        </div>
    )
}