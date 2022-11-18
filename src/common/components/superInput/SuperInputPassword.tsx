import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './SuperInputText.module.css'
import eye from './../../../assets/icons/eye.png'
import notEye from './../../../assets/icons/notEye.png'

// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string
    type:string
}

const SuperInputText: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,

        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${error ? s.errorInput : s.superInput} ${className}`

    let[typeInput,setTypeInput]=useState(type)

    const  openEye={
        backgroundImage:`url(${eye})`
    }
    const  closedEye={
        backgroundImage:`url(${notEye})`
    }
    const showPassword=()=>{
        setTypeInput('text')
    }
    const hidePassword=()=>{
        setTypeInput('password')
    }

    return (
        <>
            <div className={s.passwordContainer}>
                <input
                    type={typeInput}
                    onChange={onChangeCallback}
                    onKeyPress={onKeyPressCallback}
                    className={finalInputClassName}

                    {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
                />
                {typeInput==='password'?<div onClick={showPassword} style={closedEye} className={s.passwordImg}> </div>:<div onClick={hidePassword} style={openEye} className={s.passwordImg}> </div>}
            </div>

            {error && <span className={finalSpanClassName}>{error}</span>}
        </>
    )
}

export default SuperInputText
