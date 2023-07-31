import * as React from 'react';

import {
    Edit,
    Delete,
    Favorite,
} from '@mui/icons-material';

import {
    Grid,
    Typography,
    IconButton,
    CardActions,
    CardContent,
    CardHeader,
    Card,
    Tab,
    Box
} from '@mui/material';

import { GetTodoByID, RemoveTodo, ToggleFav } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from './Dialog'
import FlatList from 'flatlist-react'

export default function TodoListCard({ userId, showFav }) {
    const dispatch = useDispatch();
    const data = useSelector(state => state.todo.data)
    const favoritedData = useSelector(state => state.todo.favoritedData)

    const [updateTodoDialog, setUpdateTodoDialog] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(false)

    const handleUpdateDialog = () => {
        setUpdateTodoDialog(!updateTodoDialog)
    }

    const renderItem = (Todo) =>
        <Card
            sx={{ marginBottom: 2, boxShadow: 8, width: '70vw' }}
            key={Todo.todoID}
        >
            <CardHeader
                action={
                    <CardActions>
                        <IconButton aria-label="add to favorites" onClick={
                            () => {
                                ToggleFav(dispatch, Todo.todoID, Todo.isFav)
                            }
                        }>
                            <Favorite
                                color={Todo.isFav ? "warning" : ""}
                            />
                        </IconButton>
                        <IconButton aria-label="update todo" onClick={async () => {
                            handleUpdateDialog()
                            setSelectedTodo(GetTodoByID(Todo.todoID))
                        }}>
                            <Dialog dialog={updateTodoDialog} changeDialog={() => handleUpdateDialog()} dispatch={dispatch} type={true} userId={userId} data={selectedTodo} />
                            <Edit />
                        </IconButton>
                        <IconButton aria-label="remove todo" onClick={() => RemoveTodo(dispatch, Todo.todoID)}>
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
                        color: Todo.isFinished ? "green" : "red"
                    }}
                    color={'white'}
                    borderRadius={20}
                    flexWrap={'wrap'}
                >
                    {Todo.isFinished ? "Finished :)" : "Still working on"}
                </Typography>
                <Typography
                    variant="body1"
                    style={{
                        color: Todo.priorityType === "Low" ? "green" : Todo.priorityType === "Medium" ? "#F5A623" : "red"
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
            <CardContent>
                {
                    !((new Date(Todo.dateEnd).getTime() - new Date(Todo.dateStart).getTime()) / (1000 * 3600 * 24) === 0) ?
                        <Typography
                            variant="body2"
                            bgcolor={
                                (new Date(Todo.dateEnd).getTime() - new Date(Todo.dateStart).getTime()) / (1000 * 3600 * 24) <= 1 ? "red"
                                    : (new Date(Todo.dateEnd).getTime() - new Date(Todo.dateStart).getTime()) / (1000 * 3600 * 24) > 1
                                        && (new Date(Todo.dateEnd).getTime() - new Date(Todo.dateStart).getTime()) / (1000 * 3600 * 24) < 4
                                        ? "#F5A623"
                                        : "green"}
                            color={'white'}
                            textAlign={'center'}
                            padding={1}
                            borderRadius={20}
                            flexWrap={'wrap'}
                        >
                            {(new Date(Todo.dateEnd).getTime() - new Date(Todo.dateStart).getTime()) / (1000 * 3600 * 24)} Day Remain
                        </Typography>
                        : <Typography
                            variant="body2"
                            bgcolor={"red"}
                            color={'white'}
                            textAlign={'center'}
                            padding={1}
                            borderRadius={20}
                        >
                            Today must finished
                        </Typography>
                }
            </CardContent>
        </Card >

    return (
        <Grid
            style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column', overflow: 'auto' }}
        >
            <Grid style={{ overflow: 'auto', paddingLeft: 8, paddingRight: 8, height: '80vh' }} >
                <FlatList
                    list={showFav ? favoritedData : data}
                    renderItem={renderItem}

                />
            </Grid>
        </Grid>
    );
}
