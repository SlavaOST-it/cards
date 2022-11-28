import React from 'react';
import teacherLogo from "../../../assets/img/icons/packs/teacher.png"
import editLogo from "../../../assets/img/icons/packs/Edit.png"
import deleteLogo from "../../../assets/img/icons/packs/Delete.png"
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import s from "./ActionsPack.module.css"
import {deletePackTC, setPackIdAC} from "../packsList-reducer";

type ActionsPackType = {
    id: string
}
export const ActionsPack = (props: ActionsPackType) => {
    const isMyPacks = useAppSelector(state => state.packList.isMyPacks)
    const dispatch = useAppDispatch()

    const learnPackHandler = () => {
        alert('111')
    }

    const editPackHandler = () => {
        dispatch(setPackIdAC(props.id))
    }

    const deletePackHandler = () => {
        dispatch(deletePackTC(props.id))
    }
    return (
        <div className={s.actionBtn}>
            <div className={s.button} onClick={learnPackHandler}>
                <img src={teacherLogo} alt={'learn pack'}/>
            </div>
            {isMyPacks && (
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