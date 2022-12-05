import React, {ChangeEvent, FC, useEffect} from 'react';
import style from "../modals/addPackModal/AddPackModal.module.css";
import Button from "@mui/material/Button";
import {setDeckCoverAC} from "../../../features/cards/packsList-reducer";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";

type CoverInputType={
    deckCover:string
}

export const CoverInput:FC<CoverInputType> = ({deckCover}) => {
    const dispatch =useAppDispatch()
    const myDeckCover=useAppSelector(state=>state.packList.myDeckCover)

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const file = e.target.files[0]

            if (file.size < 150000) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const file64 = reader.result as string
                    dispatch(setDeckCoverAC( file64))
                }
                reader.readAsDataURL(file)
            } else {
                alert('Файл слишком большого размера')
            }
        }
    }

    useEffect(()=>{
        if(deckCover){
            dispatch(setDeckCoverAC(deckCover))
        }
    },[])
    return (
        <div className={style.coverBlock}>
            <div className={style.coverHeader}>
                <div>Cover</div>
                <div> <label>
                    <input type="file"
                           onChange={uploadHandler}
                           style={{display: 'none'}}
                    />
                    <Button variant="contained" component="span">
                        Upload button
                    </Button>
                </label> </div>
            </div>
            <div className={style.coverImage}>
                <img src={myDeckCover} alt="cover"/>
            </div>
        </div>
    );
};

