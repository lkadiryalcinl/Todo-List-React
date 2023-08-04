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
} from '@mui/icons-material'


import './TodoCard.css'

const TodoCard = ({Todo,dispatch,userId,handleUpdateDialog}) => {
    return (

        < Card
            sx={{
                boxShadow: 2,
                borderRadius: '20px',
                display: 'flex'
            }
            }
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
                                Todo.isFinished ?
                                    RemoveTodo(dispatch, Todo.todoID, "finishedtodo") :
                                    Todo.isFav ?
                                        RemoveTodo(dispatch, Todo.todoID, "favtodo") :
                                        RemoveTodo(dispatch, Todo.todoID, "todo")
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
                        variant="body1"
                        style={{
                            color: Todo.priorityType === "Low" ? "green" : Todo.priorityType === "Medium" ? "#ED6C02" : "red"
                        }}
                        color={'white'}
                        borderRadius={20}
                        flexWrap={'wrap'}
                    >
                        {Todo.priorityType} Priority
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        flexWrap={'wrap'}
                    >
                        {Todo.description}
                    </Typography>
                </CardContent>
            </Grid>
        </Card >
    )
}

export default TodoCard;