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
    Button,
    Box,
    Tab,
} from '@mui/material';

import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'

import { GetTodoByID, RemoveTodo, ToggleFav, ToggleFinished } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from './Dialog'
import FlatList from 'flatlist-react'

export default function TodoListCard({ userId }) {
    const dispatch = useDispatch();

    const data = useSelector(state => state.todo.data)
    const favoritedData = useSelector(state => state.todo.favoritedData)
    const finishedData = useSelector(state => state.todo.finishedData)

    const [updateTodoDialog, setUpdateTodoDialog] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(null)
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUpdateDialog = (todoID) => {
        console.log("todo: " + todoID);
        console.log("selected" + selectedTodo);
        if (todoID === selectedTodo?.todoID)
            setUpdateTodoDialog(true)
    }
    const handleSelected = async (todoID) => {
        const selectedData = await GetTodoByID(todoID, "todo/");

        setSelectedTodo(selectedData.todoID);
    }


    const renderItem = (Todo) =>
        <Card
            sx={{ marginBottom: 2, boxShadow: 8, width: '70vw' }}
            key={Todo.todoID}
        >
            <CardHeader
                action={
                    <CardActions>
                        {!Todo.isFinished && <IconButton aria-label="add to favorites" onClick={
                            () => {
                                Todo.isFav?
                                ToggleFav(dispatch,Todo.todoID,"favtodo",userId):
                                ToggleFav(dispatch,Todo.todoID,"todo",userId)
                            }
                        }>
                            <Favorite
                                color={Todo.isFav ? "warning" : ""}
                            />
                        </IconButton>}
                        {!Todo.isFinished && <IconButton aria-label="update todo" onClick={() => {
                            handleUpdateDialog(Todo.todoID)
                            handleSelected(Todo.todoID)
                        }}>
                            <Dialog dialog={updateTodoDialog} changeDialog={() => handleUpdateDialog(Todo.todoID)} dispatch={dispatch} type={true} userId={userId} data={selectedTodo} />
                            <Edit />
                        </IconButton>}
                        <IconButton aria-label="remove todo" onClick={() => {
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
                <Button
                    style={{
                        color: Todo.isFinished ? "green" : "red",

                    }}
                    onClick={() => 
                        Todo.isFinished?ToggleFinished(dispatch, Todo.todoID,"finishedtodo")
                        :ToggleFinished(dispatch,Todo.todoID,"todo")
                    }
                >
                    {Todo.isFinished ? "Finished :)" : "Still working on"}
                </Button>
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
            <Box sx={{ width: '75vw', typography: 'body1', height: '80vh', overflow: 'auto', justifyContent: 'center' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} variant='fullWidth' centered >
                            <Tab label="All Todos" value="1" />
                            <Tab label="Favorited Todos" value="2" />
                            <Tab label="Finished Todos" value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <FlatList
                            list={data}
                            renderItem={renderItem}
                        />
                    </TabPanel>
                    <TabPanel value="2">
                        <FlatList
                            list={favoritedData}
                            renderItem={renderItem}
                        />
                    </TabPanel>
                    <TabPanel value="3">
                        <FlatList
                            list={finishedData}
                            renderItem={renderItem}
                        />
                    </TabPanel>
                </TabContext>
            </Box>
        </Grid>
    );
}
