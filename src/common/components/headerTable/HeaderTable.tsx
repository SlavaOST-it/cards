import React, {FC} from 'react';
import style from "../../../features/cards/PacksList.module.css";
import Button from "@mui/material/Button";

type HeaderType={
    callbackToAdd:()=>void
    title?:string
    titleButton: string
}

export const HeaderTable:FC<HeaderType> = ({callbackToAdd, title,titleButton}) => {
    return (
        <div className={style.header}>
            <h2>{title}</h2>
            <div>
                <Button
                    onClick={callbackToAdd}
                    sx={{borderRadius: 5}} size="small"
                    variant="contained"
                >
                    {titleButton}
                </Button>
            </div>
        </div>
    );
};