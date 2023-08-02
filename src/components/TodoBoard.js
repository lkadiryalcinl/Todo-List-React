import * as React from 'react';

import {
    Edit,
    Delete,
    Bookmark
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
import EmptyListPlaceHolder from './EmptyListPlaceHolder';

export default function TodoBoard({ userId }) {
    const dispatch = useDispatch();

    const data = useSelector(state => state.todo.data)
    const favoritedData = useSelector(state => state.todo.favoritedData)
    const finishedData = useSelector(state => state.todo.finishedData)

    const [updateTodoDialog, setUpdateTodoDialog] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(null);
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleUpdateDialog = async (todoID) => {
        todoID !== undefined ? await GetTodoByID(todoID, "todo").then((data) => {
            setSelectedTodo(data)
        }).then(() => {
            setUpdateTodoDialog(true)
        }) :
            setUpdateTodoDialog(false)
    }

    const renderItem = (Todo) =>
        <Card
            sx={{ marginBottom: 2, boxShadow: 8 }}
            key={Todo.todoID}
        >
            <CardHeader
                action={
                    <CardActions>
                        {!Todo.isFinished && <IconButton aria-label="add to favorites" onClick={
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
                        {!Todo.isFinished && <IconButton aria-label="update todo" onClick={() => {
                            handleUpdateDialog(Todo.todoID)
                        }}>

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
                    //Todo ile finished todo arasındaki mantığı - favtodo ile finished todo arasında da kur
                    onClick={() =>
                        Todo.isFinished ?
                            ToggleFinished(dispatch, Todo.todoID, "finishedtodo", Todo.isFav)
                            : ToggleFinished(dispatch, Todo.todoID, "todo", Todo.isFav)
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
                {new Date() < new Date(Todo.dateStart) ? (
                    <Typography
                        variant="body2"
                        bgcolor={"green"}
                        color={"white"}
                        textAlign={"center"}
                        padding={1}
                        borderRadius={20}
                    >
                        {Math.round((new Date(Todo.dateStart).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} Day Left To Start Todo
                    </Typography>
                ) : new Date() > new Date(Todo.dateEnd) ? (
                    <Typography
                        variant="body2"
                        bgcolor={"red"}
                        color={"white"}
                        textAlign={"center"}
                        padding={1}
                        borderRadius={20}
                    >
                        Today Must Finished
                    </Typography>
                ) : (
                    <Typography
                        variant="body2"
                        bgcolor={
                            Math.round((new Date(Todo.dateEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) <= 1
                                ? "red"
                                : Math.round((new Date(Todo.dateEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) < 4
                                    ? "#F5A623"
                                    : "green"
                        }
                        color={"white"}
                        textAlign={"center"}
                        padding={1}
                        borderRadius={20}
                        flexWrap={"wrap"}
                    >
                        {Math.round((new Date(Todo.dateEnd).getTime() - new Date().getTime()) / (1000 * 3600 * 24))} Day Remained -
                        It will end {[new Date(Todo.dateEnd).getDate(),
                        new Date(Todo.dateEnd).getMonth() + 1,
                        new Date(Todo.dateEnd).getFullYear()]
                            .join('/')}
                    </Typography>
                )}
            </CardContent>
        </Card >

    return (
        <Grid
            style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}
        >
            <Grid style={{overflow:'auto',height:'80vh'}}>
                <Box sx={{ width: '90vw', typography: 'body1', justifyContent: 'center' }}>
                    <TabContext value={value} >
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} variant='fullWidth' centered >
                                <Tab label="All Todos" value="1" />
                                <Tab label="Marked Todos" value="2" />
                                <Tab label="Finished Todos" value="3" />
                            </TabList>
                        </Box>
                        <TabPanel value="1">
                            <FlatList
                                list={data}
                                renderItem={renderItem}
                                renderWhenEmpty={() => <div style={{color:'white',textAlign:'center'}}>This List is Empty...</div>}
                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <FlatList
                                list={favoritedData}
                                renderItem={renderItem}
                                renderWhenEmpty={() => <div style={{color:'white',textAlign:'center'}}>This List is Empty...</div>}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <FlatList
                                list={finishedData}
                                renderItem={renderItem}
                                renderWhenEmpty={() => <div style={{color:'white',textAlign:'center'}}>This List is Empty...</div>}
                            />
                        </TabPanel>
                    </TabContext>
                </Box>
                <Dialog
                    dialog={updateTodoDialog}
                    changeDialog={() => handleUpdateDialog()}
                    dispatch={dispatch}
                    type={true}
                    userId={userId}
                    data={selectedTodo}
                />
            </Grid>
        </Grid>
    );
}