import React, {FC} from 'react';
import {useAppDispatch} from "../../../../app/hooks";
import {BasicModal} from "../BasicModal";
import {deletePackTC} from "../../../../features/cards/packsList-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120,
    background: 'red'
}

type DeletePackModalType = {
    active: boolean
    setActive: (active: boolean) => void
    packName: string
    packId: string
}
export const DeletePackModal: FC<DeletePackModalType> = ({packId, active, setActive, packName}) => {

    const dispatch = useAppDispatch()

    const onSaveCallback=()=>{
        dispatch(deletePackTC(packId))
        setActive(false)
    }

    const onCloseHandler = () => {
        setActive(false)
    }
    return (
        <BasicModal active={active} setActive={onCloseHandler} onSaveCallback={onSaveCallback} nameButton={"Delete"}
                    title={"Delete Pack"} styleButton={styleButtonMUI}>
            <div>
                Do you really want to remove {packName}?
                All cards will be deleted.
            </div>
        </BasicModal>
    );
};