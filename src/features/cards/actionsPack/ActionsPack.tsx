import React, {useState} from 'react';
import teacherLogo from "../../../assets/img/icons/packs/teacher.png"
import editLogo from "../../../assets/img/icons/packs/Edit.png"
import deleteLogo from "../../../assets/img/icons/packs/Delete.png"
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import s from "./ActionsPack.module.css"
import {changePackStatusAC, deletePackTC, setPackIdAC} from "../packsList-reducer";
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";


type ActionsPackType = {
    id: string
    userId: string
}

export const ActionsPack = (props: ActionsPackType) => {
    const myId = useAppSelector(state => state.profile._id)
    const dispatch = useAppDispatch()
const [activeDeleteModal, setActiveDeleteModal] = useState(false)

    const learnPackHandler = () => {
        alert('111')
    }

    const editPackHandler = () => {
        dispatch(setPackIdAC(props.id))
    }

    const deletePackHandler = () => {
        dispatch(deletePackTC(props.id))
        setActiveDeleteModal(false)
    }

    const onActiveModal = ()=> setActiveDeleteModal(!activeDeleteModal)

    return (
        <div className={s.actionBtn}>
            <div className={s.button} onClick={learnPackHandler}>
                <img src={teacherLogo} alt={'learn pack'}/>
            </div>
            {myId === props.userId && (
                <>
                    <div className={s.button} onClick={editPackHandler}>
                        <img src={editLogo} alt={'edit pack'}/>
                    </div>
                    <div className={s.button} onClick={onActiveModal}>
                        <img src={deleteLogo} alt={'delete pack'}/>
                    </div>
                    <DeletePackModal active={activeDeleteModal} setActive={onActiveModal} onSaveCallback={()=>{}}/>
                </>
            )}
        </div>
    );
};