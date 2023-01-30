import React, {ChangeEvent, FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks/hooks";
import {BasicModal} from "../BasicModal";
import TextField from "@mui/material/TextField";
import {changeCardThunk, setAnswerCoverAC, setQuestionCoverAC} from "../../../../features/cards/cards-reducer";
import {SelectVariants} from "../../select/SelectVariants";
import {PictureCard} from "../../pictureCard/PictureCard";


const styleButtonMUI = {
    borderRadius: 10,
    width: 120
}

type ChangeCardModalType = {
    cardId: string
    packId: string
    active: boolean
    setActive: (active: boolean) => void
    question: string
    answer: string
    questionImg: string
    answerImg: string
}
export const ChangeCardModal: FC<ChangeCardModalType> = ({
                                                             active,
                                                             setActive,
                                                             cardId,
                                                             packId,
                                                             question,
                                                             answer,
                                                             questionImg,
                                                             answerImg
                                                         }) => {
    const dispatch = useAppDispatch()
    const format=useAppSelector(state=>state.cards.format)
    const questionInputImg = useAppSelector(state => state.cards.questionCover)
    const answerInputImg = useAppSelector(state => state.cards.answerCover)
    const [valueQuestion, setValueQuestion] = useState(question)
    const [valueAnswer, setValueAnswer] = useState(answer)

    const onChangeQuestionHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueQuestion(e.currentTarget.value)
    }

    const onChangeAnswerHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValueAnswer(e.currentTarget.value)
    }

    const onSaveHandler = () => {
        if(format ==='string'){
            dispatch(changeCardThunk(packId, cardId, valueQuestion, valueAnswer,'null','null'))
        }else{
            dispatch(changeCardThunk(packId, cardId, 'no question', 'no answer',answerInputImg,questionInputImg))
            dispatch(setAnswerCoverAC(''))
            dispatch(setQuestionCoverAC(''))
        }
        setActive(false)

    }

    const onCancelHandler = () => {
        setActive(false)
    }
    const buttonDisableHandler=valueQuestion&&valueAnswer?valueQuestion.length === 0 || valueAnswer.length === 0:questionImg.length===0||answerImg.length===0



    return (
        <BasicModal
            title={"Edit card"}
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
                <TextField value={valueQuestion} label="Question" margin="normal" fullWidth={true}
                           onChange={onChangeQuestionHandler}/>

                <TextField value={valueAnswer} label="Answer" margin="normal" fullWidth={true}
                           onChange={onChangeAnswerHandler}/>
            </div>:
                <PictureCard answerImage={answerImg} questionImage={questionImg}/>
            }

        </BasicModal>
    );
};
