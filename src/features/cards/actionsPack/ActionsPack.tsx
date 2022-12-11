import React, {FC, useState} from 'react';
import {useAppSelector} from "../../../utils/hooks/hooks";
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import s from "./ActionsPack.module.css"
import {DeletePackModal} from "../../../common/components/modals/deletePackModal/DeletePackModal";
import {EditPackModal} from "../../../common/components/modals/changePackModal/EditPackModal";

type ActionsPackType = {
    packId: string,
    userId: string,
    packName: string
    deckCover: string
}

export const ActionsPack: FC<ActionsPackType> = ({
                                                     deckCover,
                                                     userId,
                                                     packId,
                                                     packName
                                                 }) => {

    const myId = useAppSelector(state => state.profile._id)
    const loadingStatus = useAppSelector((state) => state.app.status)

    const [activeDeleteModal, setActiveDeleteModal] = useState(false)
    const [activeEditModal, setActiveEditModal] = useState(false)

    const learnPackHandler = () => {
        alert('111')
    }

    const onActiveModal = () => setActiveDeleteModal(!activeDeleteModal)
    const onActiveEditModal = () => setActiveEditModal(!activeEditModal)

    const disableButton = loadingStatus === 'loading'

    return (
        <button disabled={disableButton} className={s.actionBtn}>
            {packId.length && <div className={s.button} onClick={learnPackHandler}>
                <SchoolOutlinedIcon fontSize={'small'}/>
            </div>}

            {myId === userId && (
                <>
                    <button disabled={disableButton} className={s.button} onClick={onActiveEditModal}>
                        <BorderColorOutlinedIcon fontSize={'small'}/>
                    </button>

                    <button disabled={disableButton} className={s.button} onClick={onActiveModal}>
                        <DeleteIcon fontSize={'small'}/>
                    </button>

                    <DeletePackModal cardId={''} type={'pack'} packId={packId} name={packName}
                                     active={activeDeleteModal}
                                     setActive={onActiveModal}
                    />
                    <EditPackModal deckCover={deckCover} name={packName} packId={packId} active={activeEditModal}
                                   setActive={onActiveEditModal}/>
                </>
            )}
        </button>
    );
};