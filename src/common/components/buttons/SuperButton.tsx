import React from 'react'
import style from "./SuperButton.module.css";

type SuperButtonType = {
    title?: string,
    img? : string,
    callBack?: () => void,
    disable?: boolean,
    className?: string

}

export const SuperButton =(props: SuperButtonType) => {
    const finalClassName = `${style.button} ${'' ? style.button : style.default} ${props.className}`
    // `${s.buttons} ${red ? s.red : s.default} ${className}`
    return (
        <button
            className={finalClassName}
            onClick={props.callBack}
            disabled={props.disable}
        >{props.img}{props.title}</button>
    )
}