import React from 'react'
import style from "./SuperButton.module.css";

type SuperButtonType = {
    title?: string,
    callBack?: (event: React.MouseEvent<HTMLButtonElement>) => void,
    disable?: boolean,
    className?: string

}

export const SuperButton =(props: SuperButtonType) => {
    const finalClassName = `${style.button} ${'' ? style.button : style.default} ${props.className}`
    // `${s.button} ${red ? s.red : s.default} ${className}`
    return (
        <button
            className={finalClassName}
            onClick={props.callBack}
            disabled={props.disable}
        >{props.title}</button>
    )
}