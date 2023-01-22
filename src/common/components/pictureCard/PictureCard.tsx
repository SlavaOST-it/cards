import React from 'react';
import {Link} from "@mui/material";
import style from "./PictureCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {uploadHandler} from "../../../utils/uploadHandler/uploadHandler";

export const PictureCard = () => {
    const dispatch = useAppDispatch()
    const cardQuestionImage = useAppSelector(state => state.cards.questionImg)
    const cardAnswerImage = useAppSelector(state => state.cards.answerImg)

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
                <img src={cardQuestionImage} alt="cover"/>
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
                <img src={cardAnswerImage} alt="cover"/>
            </div>
        </div>
    );
};

