import * as React from 'react'

import {
    RemoveTodo,
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
    IconButton
} from '@mui/material'

import {
    Edit,
    Delete,
    Bookmark,
    PriorityHigh,
} from '@mui/icons-material'

import './TodoCard.css'
import AlertDialog from '../Dialog/AlertDialog/AlertDialog'

const TodoCard = ({ Todo, dispatch, userId, handleUpdateDialog }) => {

    const [openAlert, setOpenAlert] = React.useState(false)

    const handleOption1Click = (Todo) => {
        Todo.isFinished ?
            RemoveTodo(dispatch, Todo.todoID, "finishedtodo") :
            Todo.isFav ?
                RemoveTodo(dispatch, Todo.todoID, "favtodo") :
                RemoveTodo(dispatch, Todo.todoID, "todo")
        setOpenAlert(false);
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
            <Checkbox
                onClick={() =>
                    Todo.isFinished ?
                        ToggleFinished(dispatch, Todo.todoID, "finishedtodo", Todo.isFav)
                        : ToggleFinished(dispatch, Todo.todoID, "todo", Todo.isFav)
                }
                checked={Todo.isFinished}
                color={Todo.isFinished ? "success" : "warning"}
            />
            <Grid className='card-info-container'>
                <CardHeader
                    action={
                        <CardActions>
                            {!Todo.isFinished && <IconButton
                                className={
                                    Todo.priorityType === "0" ? "priority-icon-button-success"
                                        : Todo.priorityType === "1" ? "priority-icon-button-warning"
                                            : "priority-icon-button-error"}
                            >
                                <PriorityHigh
                                    color={Todo.priorityType === "0" ? "success" : Todo.priorityType === "1" ? "warning" : "error"}
                                />
                            </IconButton>}
                            {!Todo.isFinished && <IconButton onClick={
                                () => {
                                    Todo.isFav ?
                                        ToggleFav(dispatch, Todo.todoID, "favtodo", userId) :
                                        ToggleFav(dispatch, Todo.todoID, "todo", userId)
                                }
                            }>
                                <Bookmark
                                    color={Todo.isFav ? "warning" : ""}
                                />
                            </IconButton>}
                            {!Todo.isFinished && <IconButton onClick={() => {
                                handleUpdateDialog(Todo.todoID)
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
                    title={Todo.title}
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
        </Card >
    )
}

export default TodoCard;