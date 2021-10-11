import * as React from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';



import {useForm} from "react-hook-form"

import './Login.scss'

function Login(){
    const {register, handleSubmit, formState:{errors}} = useForm()
    const onSubmit = data => console.log(data)


    return(
        <div className="container">
            <div className="container-login">
                <form>
                    
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                    


                </form>
            </div>

        </div>
    )
}

export default Login;