import {ChangeEvent} from "react";
import {setDeckCoverAC} from "../../features/cards/packsList-reducer";
import {AppDispatchType} from "../../app/store";
import {setAnswerCoverAC, setQuestionCoverAC} from "../../features/cards/cards-reducer";

export const uploadHandler = (e: ChangeEvent<HTMLInputElement>,dispatch:AppDispatchType,cover:string) => {
    if (e.target.files && e.target.files.length) {
        const file = e.target.files[0]

        if (file.size < 100000) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const file64 = reader.result as string
                if(cover==='coverForPack'){
                    dispatch(setDeckCoverAC( file64))
                }
                if(cover==='coverForQuestion'){
                    dispatch(setQuestionCoverAC( file64))
                }
                else{
                    dispatch(setAnswerCoverAC( file64))
                }

            }
            reader.readAsDataURL(file)
        } else {
            alert('Файл слишком большого размера')
        }
    }
}
const errorHandler = () => {
    alert('Кривая картинка')
}