import React, {ChangeEvent, FC, useState} from 'react'
import {BasicModal} from '../BasicModal'
import TextField from '@mui/material/TextField'
import {useAppDispatch, useAppSelector} from '../../../../utils/hooks/hooks'
import {addCardThunk, changeCardThunk} from '../../../../features/cards/cards-reducer'
import {Box} from '@mui/material'
import Button from '@mui/material/Button'

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
export const EditAndAddCardsModal: FC<EditAndAddCardsModalType> = ({
                                                                       answerCard,
                                                                       questionCard,
                                                                       type,
                                                                       active,
                                                                       setActive,
                                                                       cardsPackId
                                                                   }) => {
    const dispatch = useAppDispatch()
    const cardID = useAppSelector(state => state.cards.cardId)

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
            dispatch(addCardThunk(cardsPackId, question, answer))
            setActive(false)
            setQuestion('')
            setAnswer('')
        } else {
            dispatch(changeCardThunk(cardsPackId, cardID, question, answer))
            setActive(false)
        }
    }

    const onCancelHandler = () => {
        setActive(false)
    }

    export const InputTypeFile = () => {

        const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length) {
                const file = e.target.files[0]
                console.log('file: ', file)
            }
        };

        const cardQuestion = [
            {
                value: 'Question as string',
                label: 'Question as string',
            },
            {
                value: 'Question as image',
                label: 'Question as image',
            },
        ]

        const cardAnswer = [
            {
                value: 'Answer as string',
                label: 'Answer as string',
            },
            {
                value: 'Answer as image',
                label: 'Answer as image',
            },
        ]

        return <div><BasicModal
            title={'Add new card'}
            nameButton={'Save'}
            active={active}
            setActive={onCancelHandler}
            onSaveCallback={onSaveHandler}
            disabledButton={question.length === 0 || answer.length === 0}
            styleButton={styleButtonMUI}
        >
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': {m: 1, width: '25ch'},
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <TextField value={question}
                               margin="normal"
                               fullWidth={true}
                               select
                               SelectProps={{
                                   native: true,
                               }}
                               onChange={onChangeQuestionHandler}
                    >
                        {cardQuestion.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
                <div>
                    <TextField value={answer}
                               margin="normal" fullWidth={true}
                               select
                               SelectProps={{
                                   native: true,
                               }}
                               onChange={onChangeAnswerHandler}>
                        {cardAnswer.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </TextField>
                </div>
            </Box>
            <div>
                <TextField value={question} label="Card question" margin="normal" fullWidth={true}
                           placeholder={'Card question'}
                           onChange={onChangeQuestionHandler}/>
            </div>
            <div>
                <TextField value={answer} label="Card answer" margin="normal" fullWidth={true}
                           placeholder={'Card answer'}
                           onChange={onChangeAnswerHandler}/>
            </div>
        </BasicModal>
            <div>
                <label>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button variant="contained" component="span">
                        Upload button
                    </Button>
                </label>
            </div>
        </div>
    }
}