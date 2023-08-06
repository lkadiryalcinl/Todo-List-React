import * as React from 'react'
import {
    Grid, Typography,

} from '@mui/material'

import Navbar from '../../components/Navbar/Navbar'

import './AccountSettings.css'
const accountSettings = () => {
    return (
        <>
            <Navbar />
            <Grid className='account-container'>
                <Grid className='account-top-title-container'>
                    <Grid className='account-top-title'>
                        <Typography className='account-top-title-text'>
                            Account Settings
                        </Typography>
                    </Grid>
                </Grid>
                <Grid className='account-content-container'>
                    
                </Grid>
            </Grid>
        </>
    )
}

export default accountSettings;