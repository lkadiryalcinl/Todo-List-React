import { useState } from 'react'

import {
    DeactivateTodo,
    ToggleFav,
    ToggleFinished
} from '../../utils/utils'

import {
    Grid,
    Typography,
    CardActions,
    CardContent,
    CardHeader,
    Card,
    Checkbox,
    IconButton,
    Icon
} from '@mui/material'

import {
    Edit,
    Delete,
    Bookmark,
    PriorityHigh,
    Info
} from '@mui/icons-material'

import './TodoCard.css'
import AlertDialog from '../Dialog/AlertDialog/AlertDialog'
import InfoDialog from '../Dialog/InfoDialog/InfoDialog'

const TodoCard = ({ Todo, handleUpdateDialog, setUserAction, userAction }) => {

    const [openAlert, setOpenAlert] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);

    const handleOption1Click = (Todo) => {
        DeactivateTodo(Todo.todoID)
        setOpenAlert(false);
        if (setUserAction)
            setUserAction(userAction + 1)
    };

    const handleOption2Click = () => {
        setOpenAlert(false);
    };

    return (

        < Card
            sx={{
                boxShadow: 2,
                borderRadius: '20px',
                display: 'flex'
            }}
            key={Todo.todoID}
        >
            <Grid sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: '1rem'
            }}>

                {!Todo.isFinished && <Icon
                    className={
                        Todo.priorityType === "0" ? "priority-icon-button-success"
                            : Todo.priorityType === "1" ? "priority-icon-button-warning"
                                : "priority-icon-button-error"}
                >
                    <PriorityHigh
                        color={Todo.priorityType === "0" ? "success" : Todo.priorityType === "1" ? "warning" : "error"}

                    />
                </Icon>}
            </Grid>

            <Grid className='card-info-container'>
                <CardHeader
                    action={
                        <CardActions>
                            <IconButton
                                onClick={() => {
                                    setOpenInfo(!openInfo)
                                }}
                            >
                                <Info />
                            </IconButton>
                            {!Todo.isFinished && <IconButton onClick={
                                () => {
                                    Todo.isFav ?
                                        ToggleFav(Todo.todoID) :
                                        ToggleFav(Todo.todoID)
                                    if (setUserAction)
                                        setUserAction(userAction + 1)
                                }
                            }>
                                <Bookmark
                                    color={Todo.isFav ? "warning" : ""}
                                />
                            </IconButton>}
                            {!Todo.isFinished && <IconButton onClick={() => {
                                handleUpdateDialog(Todo.todoID)
                                if (setUserAction)
                                    setUserAction(userAction + 1)
                            }}>

                                <Edit />
                            </IconButton>}
                            <IconButton onClick={() => {
                                setOpenAlert(!openAlert)
                            }}>
                                <Delete />
                            </IconButton>
                        </CardActions>
                    }

                    title={
                        <>
                            <Checkbox
                                onClick={() => {
                                    Todo.isFinished ?
                                        ToggleFinished(Todo.todoID)
                                        : ToggleFinished(Todo.todoID)
                                    if (setUserAction)
                                        setUserAction(userAction + 1)
                                }}
                                checked={Todo.isFinished}
                                color={Todo.isFinished ? "success" : "warning"}
                            />
                            {Todo.title}
                        </>
                    }
                    titleTypographyProps={{ textAlign: 'left', alignSelf: 'flex-end' }}
                    subheader={
                        "Todo Created: "
                        +
                        [new Date(Todo.dateCreated).getDate(),
                        new Date(Todo.dateCreated).getMonth() + 1,
                        new Date(Todo.dateCreated).getFullYear()]
                            .join('/')
                    }
                />
                <CardContent>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        flexWrap={'wrap'}
                    >
                        {Todo.description}
                    </Typography>
                </CardContent>
            </Grid>
            <AlertDialog
                title={"Are you sure?"}
                description={"Do you want to remove this todo?"}
                open={openAlert}
                setOpen={setOpenAlert}
                option1={() => handleOption1Click(Todo)}
                option2={handleOption2Click}
            />
            <InfoDialog
                open={openInfo}
                setOpen={setOpenInfo}
                Todo={Todo}
            />
        </Card >
    )
}

export default TodoCard;