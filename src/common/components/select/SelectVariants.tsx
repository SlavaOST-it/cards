import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {setFormatAC} from "../../../features/cards/cards-reducer";
import {useAppDispatch} from "../../../utils/hooks/hooks";

export  function SelectVariants() {
    const [age, setAge] = React.useState('');
    const dispatch =useAppDispatch()

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
        dispatch( setFormatAC(event.target.value))
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 370 }}>
                <InputLabel id="demo-simple-select-standard-label">Choose a question format</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={age}
                    onChange={handleChange}
                    label="Choose a question format"
                >
                    <MenuItem value={'picture'}>Picture</MenuItem>
                    <MenuItem value={'string'}>String</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
}