import * as React from 'react';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import {setSortAC} from "../../../features/cards/packsList-reducer";
import {sortCardsAC} from '../../../features/cards/cards-reducer'
import {useAppDispatch, useAppSelector} from "../../../utils/hooks/hooks";

export const SelectSort = () => {
    const dispatch = useAppDispatch()
    const selected = useAppSelector(state => state.packList.selected)

    const onclickUpHandler = () => {
        dispatch(setSortAC('0name', false))
        dispatch(sortCardsAC('0question', false))
    }
    const onclickDownHandler = () => {
        dispatch(setSortAC('1name', true))
        dispatch(sortCardsAC('1question', true))
    }
    return <div>
        {selected ? <ArrowUpwardOutlinedIcon onClick={onclickUpHandler}/> :
            <ArrowDownwardOutlinedIcon onClick={onclickDownHandler}/>}
    </div>

}