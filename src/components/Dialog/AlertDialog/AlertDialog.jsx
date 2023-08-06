import { Button, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material'
import * as React from 'react'

const AlertDialog = ({ title, description, open, setOpen, option1, option2 }) => {

    return (
        <Dialog
            className='alert-container'
            open={open}
            onClose={() => {
                if (setOpen)
                    setOpen(false)
            }}

        >
            <DialogTitle
                className='alert-container-top'
                sx={{
                    backgroundColor: '#ED6C02',
                    color: 'white'
                }}
            >{title}
            </DialogTitle>
            <DialogContent
                className='alert-container-bottom'
            >
                <Grid className='alert-content'>
                    <Grid className='alert-content-top'>
                        <Typography className='alert-content-top-text'>
                            {description}
                        </Typography>
                    </Grid>
                    <Grid className='alert-content-bottom'>
                        <Button
                            onClick={option1}
                            className='alert-content-bottom'
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#ED6C0240',
                                    color: 'white'
                                },
                            }}
                        >
                            <Typography
                                className='alert-content-bottom-text'
                                sx={{
                                    color: '#ED6C02',
                                }}
                            >
                                OK
                            </Typography>
                        </Button>
                        <Button
                            onClick={option2}
                            className='alert-content-bottom'
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#ED6C0240',
                                    color: 'white'
                                },
                            }}
                        >
                            <Typography
                                className='alert-content-bottom-text'
                                sx={{
                                    color: '#ED6C02'
                                }}
                            >
                                Cancel
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    )
}

export default AlertDialog