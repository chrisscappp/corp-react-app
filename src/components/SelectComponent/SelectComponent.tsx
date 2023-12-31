import { useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Rangs, SortPropType } from 'models';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface SelectComponentProps {
    selectProp: SortPropType;
    her?: Dispatch<SetStateAction<Rangs | "">>,
    children: ReactNode
}

const SelectComponent = ({selectProp, her, children}: SelectComponentProps) => {
    const [value, setValue] = useState("")

    const handleChange = (event: any) => {
        setValue(event.target.value)
        if (her) {
            her(event.target.value)
        }
    }

    return (
        <div style = {{paddingTop: "10px"}}>
            <FormControl sx={{ width: "100%" }}>
                <InputLabel 
                    id="demo-simple-select-helper-label"
                >
                    {selectProp.inputLabel}
                </InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={value}
                    label={selectProp.inputLabel}
                    onChange={handleChange}
                >
                    {children}
                </Select>
            </FormControl>
        </div>
    )
}

export default SelectComponent

//                <FormHelperText>{selectProp.helperText}</FormHelperText>