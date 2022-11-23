import React from 'react';
import teacherLogo from "../../../assets/img/icons/packs/teacher.png"
import editLogo from "../../../assets/img/icons/packs/Edit.png"
import deleteLogo from "../../../assets/img/icons/packs/Delete.png"
import {useAppSelector} from "../../../app/hooks";
import s from "./ActionsPack.module.css"

export const ActionsPack = () => {
    const isMyPacks = useAppSelector(state => state.packs.isMyPacks)

    const learnPackHandler = () => {
        alert('111')
    }

    const editPackHandler = () => {
        alert("22")
    }

    const deletePackHandler = () => {
        alert("333")
    }
    return (
        <div className={s.actionBtn}>
            <div className={s.button} onClick={learnPackHandler}>
                <img src={teacherLogo} alt={'learn pack'}/>
            </div>
            {!isMyPacks && (
                <>
                    <div className={s.button} onClick={editPackHandler}>
                        <img src={editLogo} alt={'edit pack'}/>
                    </div>
                    <div className={s.button} onClick={deletePackHandler}>
                        <img src={deleteLogo} alt={'delete pack'}/>
                    </div>
                </>
            )}

        </div>
    );
};