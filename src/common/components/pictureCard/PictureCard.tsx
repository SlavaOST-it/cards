import React, {ChangeEvent} from 'react';
import {Link} from "@mui/material";
import {baseDeckCover} from "../../../assets/baseDeckCover";
import style from "./PictureCard.module.css"
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";
import {uploadHandler} from "../../../utils/uploadHandler/uploadHandler";

export const PictureCard = () => {
    const dispatch =useAppDispatch()
    const deckCover =useAppSelector(state=>state.packList.myDeckCover)

    return (
        <div className={style.container}>
            <div className={style.block}>
                <div>Question:</div>
                <label>
                    <input type="file"
                           onChange={(e)=>uploadHandler(e,dispatch)}
                           style={{display: 'none'}}
                    />
                    <Link component="span" variant="body2">
                        Change cover
                    </Link>
                </label>
            </div>
            <div className={style.picture}>
                 <img  src={  deckCover } alt="cover"/>
            </div>
            <div className={style.block}>
                <div>Answer:</div>
                <label>
                    <input type="file"
                           onChange={(e)=>uploadHandler(e,dispatch)}
                           style={{display: 'none'}}
                    />
                    <Link component="span" variant="body2">
                        Change cover
                    </Link>
                </label>
            </div>
            <div className={style.picture}>
                 <img  src={  baseDeckCover } alt="cover"/>
            </div>
        </div>
    );
};

