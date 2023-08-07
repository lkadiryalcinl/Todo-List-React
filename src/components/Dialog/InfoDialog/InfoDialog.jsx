import * as React from 'react'

import {
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    Typography
} from '@mui/material'

import TodoAlert from '../../TodoAlert/TodoAlert'
import './InfoDialog.css'

const InfoDialog = ({ open, setOpen, Todo }) => {
    const dateStart = [new Date(Todo.dateStart).getDate(),
    new Date(Todo.dateStart).getMonth() + 1,
    new Date(Todo.dateStart).getFullYear()]
        .join('/');

    const dateEnd = [new Date(Todo.dateEnd).getDate(),
    new Date(Todo.dateEnd).getMonth() + 1,
    new Date(Todo.dateEnd).getFullYear()]
        .join('/');

    return (
        <Grid className='info-container'>
            <Dialog
                className='info-dialog-container'
                open={open}
                onClose={() => {
                    if (setOpen)
                        setOpen(false)
                }}
            >
                <Grid sx={{
                    width: '20dvw',
                    height: '40dvh',
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <DialogTitle
                        className='info-dialog-container-title'
                    >Todo Info
                    </DialogTitle>
                    <DialogContent>
                        <Grid container className='info-dialog-top-container'>
                            <Grid container>
                                <Grid>
                                    <Typography sx={{
                                        fontWeight: 'bold'
                                    }}>
                                        Title :
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography >
                                        {Todo.title}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid>
                                    <Typography sx={{
                                        fontWeight: 'bold'
                                    }}>
                                        Description :
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography >
                                        {Todo.description}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid container>
                                <Grid>
                                    <Typography sx={{
                                        fontWeight: 'bold'
                                    }}>
                                        Priority Type :
                                    </Typography>
                                </Grid>
                                <Grid>
                                    <Typography >
                                        {Todo.priorityType === "0" ? "Low" : Todo.priorityType === "1" ? "Medium" : "High"}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>


                        <Grid className='info-dialog-bottom-container'>

                            <Grid sx={{
                                display:'flex',
                                flexDirection:'row'
                            }}>
                                <Grid container>
                                    <Grid>
                                        <Typography sx={{
                                            fontWeight: 'bold'
                                        }}>
                                            Start Date :
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography >
                                            {dateStart}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container>
                                    <Grid>
                                        <Typography sx={{
                                            fontWeight: 'bold'
                                        }}>
                                            End Date :
                                        </Typography>
                                    </Grid>
                                    <Grid>
                                        <Typography >
                                            {dateEnd}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid>
                                <TodoAlert Todo={Todo} />
                            </Grid>

                        </Grid>
                    </DialogContent>
                </Grid>
            </Dialog>
        </Grid>
    )
}

export default InfoDialog;