import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Controller} from 'react-hook-form';

export default function Multilinefield(props) {
    const {label, placeholder, name, control,width} = props
    return (
        <Controller
        name = {name}
        control={control}
        render={({
            field:{onChange,value},
            fieldState:{error},
            formState
        }) => 
            <TextField
                    id="standard-multiline-static"
                    label={label}
                    sx={{width:{width}}}
                    variant="standard"
                    multiline
                    onChange={onChange}
                    value={value}
                    rows={1}
                    placeholder={placeholder}
                    error = {!!error}
                    helperText = {error?.message}
                    />
            }
        />
    );
}