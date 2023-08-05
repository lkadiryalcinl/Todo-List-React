import * as React from 'react'

import {
    Grid,
    Icon,
    Link,
    Typography
} from '@mui/material'

import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'

import './DrawerButton.css'

const DrawerButton = ({ title, href, logout, icon }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <Grid className='drawer-button-container' onClick={() => {
            if (logout)
                dispatch({ type: 'LOGOUT' })
            navigate(href)
        }}>
            <Icon
                color='inherit'
            >
                {icon}
            </Icon>
            <Link
                className='drawer-button-text-container'
                underline='none'
            >
                <Typography className='drawer-button-text'>
                    {title}
                </Typography>
            </Link>
        </Grid>
    )
}

export default DrawerButton