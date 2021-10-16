import React, {useContext, useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import logo from '../../Assents/logo.svg'

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

import InputAdornment from '@mui/material/InputAdornment';

//import AccountCircle from '@mui/icons-material/AccountCircle';


import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import {database} from '../../util/firebase'


import { ref, set, get, child, onValue, update, remove } from "firebase/database";



import {useForm} from "react-hook-form"

import'./Game.scss'

function Game(){
    
    return(
      
        <div className="container_body">
            
            <div className="main">
                
            </div>

        </div>
    )
}

export default Game;