import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {useAppDispatch} from "../../../../app/hooks";
import {addCardThunk} from "../../../../features/cards/cards-reducer";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}
type AddPackModalType = {
    active: boolean
    setActive: (active:boolean)=>void
    cardsPackId:string
}
export const AddCardsModal:FC<AddPackModalType> = ({active, setActive,cardsPackId}) => {
    const dispatch = useAppDispatch()
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')


    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        dispatch(addCardThunk(cardsPackId,question,answer))
        setActive(false)
        setQuestion('')
        setAnswer('')
    }

    const onCancelHandler = () => {
        setActive(false)
    }


    return (
        <BasicModal
            title={"Add new pack"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={question.length === 0||answer.length === 0}
            styleButton={styleButtonMUI}
        >
            <div>
                <TextField value={question} label="Card question" margin="normal" fullWidth={true} placeholder={"Card question"}
                           onChange={onChangeQuestionHandler}/>
            </div>
            <div>
                <TextField value={answer} label="Card answer" margin="normal" fullWidth={true} placeholder={"Card answer"}
                           onChange={onChangeAnswerHandler}/>
            </div>

        </BasicModal>
    );
};