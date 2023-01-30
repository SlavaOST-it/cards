import React, {FC, useEffect} from 'react';
import {Link} from "@mui/material";
import style from "./PictureCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {uploadHandler} from "../../../utils/uploadHandler/uploadHandler";
import {baseDeckCover} from "../../../assets/baseDeckCover";
import {setAnswerCoverAC, setQuestionCoverAC} from "../../../features/cards/cards-reducer";

type PictureCardType = {
    questionImage: string,
    answerImage: string
}

export const PictureCard: FC<PictureCardType> = ({
                                                     questionImage,
                                                     answerImage
                                                 }) => {
    const dispatch = useAppDispatch()
    const questionInputImg = useAppSelector(state => state.cards.questionCover)
    const answerInputImg = useAppSelector(state => state.cards.answerCover)

    useEffect(()=>{
        dispatch(setQuestionCoverAC(questionImage))
        dispatch(setAnswerCoverAC(answerImage))
    },[])
    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>Question:</div>
                <label>
                    <input type="file"
                           onChange={(e) => uploadHandler(e, dispatch, "coverForQuestion")}
                           style={{display: 'none'}}
                    />
                    <Link component="span" variant="body2">
                        Change cover
                    </Link>
                </label>
            </div>
            <div className={style.picture}>
                <img src={questionInputImg && questionInputImg.length > 100 ? questionInputImg : baseDeckCover}
                     alt="cover"/>
            </div>
            <div className={style.block}>
                <div>Answer:</div>
                <label>
                    <input type="file"
                           onChange={(e) => uploadHandler(e, dispatch, "coverForAnswer")}
                           style={{display: 'none'}}
                    />
                    <Link component="span" variant="body2">
                        Change cover
                    </Link>
                </label>
            </div>
            <div className={style.picture}>
                <img src={answerInputImg && answerInputImg.length > 100 ? answerInputImg : baseDeckCover}
                     alt="cover"/>
            </div>
        </div>
    );
};

