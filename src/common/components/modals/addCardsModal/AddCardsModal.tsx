import React, {ChangeEvent, FC, useState} from 'react';
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {addCardThunk, changeCardThunk} from "../../../../features/cards/cards-reducer";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {SelectVariants} from "../../select/SelectVariants";
import {PictureCard} from "../../pictureCard/PictureCard";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}
type EditAndAddCardsModalType = {
    active: boolean
    setActive: (active: boolean) => void
    cardsPackId: string
    type: 'edit' | 'add'
    answerCard: string
    questionCard: string
}
export const AddCardsModal: FC<EditAndAddCardsModalType> = ({
                                                                       answerCard,
                                                                       questionCard,
                                                                       type,
                                                                       active,
                                                                       setActive,
                                                                       cardsPackId
                                                                   }) => {
    const dispatch = useAppDispatch()
    const cardID = useAppSelector(state => state.cards.cardId)
    const format=useAppSelector(state=>state.cards.format)
    const questionImg = useAppSelector(state => state.cards.questionCover)
    const answerImg = useAppSelector(state => state.cards.answerCover)


    const [question, setQuestion] = useState(questionCard)
    const [answer, setAnswer] = useState(answerCard)


    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        if (type === 'add') {
            dispatch(addCardThunk(cardsPackId, question, answer,questionImg, answerImg))
            setActive(false)
            setQuestion('')
            setAnswer('')
        }
        else {
            dispatch(changeCardThunk(cardsPackId, cardID, question, answer))
            setActive(false)
        }

    }


    const onCancelHandler = () => {
        setActive(false)
    }

const buttonDisableHandler=question&& answer?question.length === 0 || answer.length === 0:questionImg.length===0||answerImg.length===0
    return (
        <BasicModal
            title={"Add new card"}
            nameButton={"Save"}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={buttonDisableHandler}
            styleButton={styleButtonMUI}
        >
            <SelectVariants/>
            {format === 'string' ?
                <div>
                    <div>
                        <TextField value={question} label="Card question" margin="normal" fullWidth={true}
                                   placeholder={"Card question"}
                                   onChange={onChangeQuestionHandler}/>
                    </div>
                    <div>
                        <TextField value={answer} label="Card answer" margin="normal" fullWidth={true} placeholder={"Card answer"}
                                   onChange={onChangeAnswerHandler}/>
                    </div>
                </div> :
           <PictureCard/>
            }

        </BasicModal>
    );
};