import React, {FC, useState} from 'react';
import teacherLogo from "../../../assets/img/icons/packs/teacher.png"
import editLogo from "../../../assets/img/icons/packs/Edit.png"
import deleteLogo from "../../../assets/img/icons/packs/Delete.png"
import {useAppSelector} from "../../../app/hooks";
import s from "./ActionsPack.module.css"
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/changePackModal/EditPackModal";


type ActionsPackType = {
    packId: string,
    userId: string,
    packName: string
}

export const ActionsPack: FC<ActionsPackType> = ({
                                                     userId,
                                                     packId,
                                                     packName
                                                 }) => {
    const myId = useAppSelector(state => state.profile._id)
    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)

    const learnPackHandler = () => {
        alert('111')
    }


    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)

    return (
        <div className={s.actionBtn}>
            {packId.length && <div className={s.button} onClick={learnPackHandler}>
                <img src={teacherLogo} alt={'learn pack'}/>
            </div>}

            {myId === userId && (
                <>
                    <div className={s.button} onClick={onActiveEditModal}>
                        <img src={editLogo} alt={'edit pack'}/>
                    </div>
                    <div className={s.button} onClick={onActiveModal}>
                        <img src={deleteLogo} alt={'delete pack'}/>
                    </div>
                    <DeletePackModal cardId={''} type={'pack'} packId={packId} name={packName} active={activeDeleteModal}
                                     setActive={onActiveModal}
                    />
                    <EditPackModal name={packName} packId={packId} active={activeEditModal}
                                   setActive={onActiveEditModal}/>

                </>
            )}
        </div>
    );
};