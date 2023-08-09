import { Button, Grid, Icon, Typography } from '@mui/material'
import * as React from 'react'

import './AccountButton.css'
const AccountButton = ({ icon, label }) => {
    return (
        <Button className='button-container'>
            <Grid container className='button-content-container'>
                <Icon className='icon'>
                    {icon}
                </Icon>
                <Grid className='button-text-container'>
                    <Typography
                        variant='body1'
                    >
                        {label}
                    </Typography>
                </Grid>
            </Grid>
        </Button>
    )
}

export default AccountButton