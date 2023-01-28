import React from 'react';
import {Link} from "@mui/material";
import style from "./PictureCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {uploadHandler} from "../../../utils/uploadHandler/uploadHandler";
import {baseDeckCover} from "../../../assets/baseDeckCover";

export const PictureCard = () => {
    const dispatch = useAppDispatch()
    const cardQuestionImage = useAppSelector(state =>state.cards.questionCover)
    const cardAnswerImage = useAppSelector(state => state.cards.answerCover)

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
                <img src={cardQuestionImage?cardQuestionImage:baseDeckCover} alt="cover"/>
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
                <img  src={cardAnswerImage?cardAnswerImage:baseDeckCover} alt="cover"/>
            </div>
        </div>
    );
};

