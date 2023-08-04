import * as React from 'react';

import {
    Edit,
    Delete,
    Bookmark,
    Menu,
    ViewHeadlineOutlined,
    GridViewOutlined
} from '@mui/icons-material';

import {
    Grid,
    Typography,
    IconButton,
    CardActions,
    CardContent,
    CardHeader,
    Card,
    Box,
    Tab,
    Checkbox,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Button,
} from '@mui/material';

import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'

import './TodoBoard.css';
import { GetTodoByID, RemoveTodo, ToggleFav, ToggleFinished } from '../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from './Dialog'
import FlatList from 'flatlist-react'

export default function TodoBoard({ userId }) {
    const dispatch = useDispatch();

    const data = useSelector(state => state.todo.data)
    const favoritedData = useSelector(state => state.todo.favoritedData)
    const finishedData = useSelector(state => state.todo.finishedData)

    const [updateTodoDialog, setUpdateTodoDialog] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(null);
    const [tabValue, setTabValue] = React.useState('1');
    const [radioSortValue, setRadioSortValue] = React.useState('title');
    const [radioOrderValue, setRadioOrderValue] = React.useState('asc');
    const [columnWidth, setColumnWidth] = React.useState('40vw')

    const handleRadioSortValue = (event) => {
        setRadioSortValue(event.target.value);
    };


    const handleRadioOrderValue = (event) => {
        setRadioOrderValue(event.target.value);
    };

    const handleTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleUpdateDialog = async (todoID) => {
        todoID !== undefined ? await GetTodoByID(todoID, "todo").then((data) => {
            setSelectedTodo(data)
        }).then(() => {
            setUpdateTodoDialog(true)
        }) :
            setUpdateTodoDialog(false)
    }

    const renderWhenEmpty = () => {
        return <div style={{ color: 'black', textAlign: 'center' }}>This List is Empty...</div>
    }

    const SortCard = () => {
        return (
            <Grid className='filter-card-container'>
                <FormControl>
                    <FormLabel
                        id="radio-buttons-group"
                        className='radio-text-title'
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="default"
                        >
                            <Menu />
                        </IconButton>
                        Sort
                    </FormLabel>
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={radioSortValue}
                        onChange={handleRadioSortValue}
                    >
                        <FormControlLabel
                            value="title"
                            control={<Radio
                                color='warning'
                            />}
                            label="Title"
                            className='radio-text'

                        />
                        <FormControlLabel
                            value="deadline"
                            control={<Radio
                                color='warning'
                            />}
                            label="Deadline"
                            className='radio-text'

                        />
                        <FormControlLabel
                            value="priority"
                            control={<Radio
                                color='warning'
                            />}
                            label="Priority"
                            className='radio-text'

                        />
                        <FormControlLabel
                            value="createdDate"
                            control={<Radio
                                color='warning'
                            />}
                            label="Created Date"
                            className='radio-text'

                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        )
    }

    const OrderCard = () => {
        return (
            <Grid className='filter-card-container'>
                <FormControl>
                    <FormLabel
                        id="radio-buttons-group"
                        className='radio-text-title'
                    >
                        <IconButton
                            size="large"
                            edge="start"
                            color="default"
                        >
                            <Menu />
                        </IconButton>
                        Order
                    </FormLabel>
                    <RadioGroup
                        name="controlled-radio-buttons-group"
                        value={radioOrderValue}
                        onChange={handleRadioOrderValue}
                    >
                        <FormControlLabel
                            value="asc"
                            control={<Radio
                                color='warning'
                            />}
                            label="Ascending"
                            className='radio-text'

                        />
                        <FormControlLabel
                            value="desc"
                            control={<Radio
                                color='warning'
                            />}
                            label="Descending"
                            className='radio-text'

                        />
                    </RadioGroup>
                </FormControl>
            </Grid>
        )
    }

    const renderItem = (Todo) =>
        <Card
            sx={{
                marginBottom: 2,
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
            </Grid>
        </Card >

    return (
        <Grid className='todo-board-container'>
            <Grid className='todo-board-filter-container'>
                <Grid className='view-control-container'>
                    <IconButton color={columnWidth === "40vw" ? 'warning' : 'default'} onClick={() => {
                        setColumnWidth('40vw')
                    }}>
                        <ViewHeadlineOutlined />
                    </IconButton>
                    <IconButton color={columnWidth === "30vw" ? 'warning' : 'default'} onClick={() => {
                        setColumnWidth('30vw')
                    }}>
                        <GridViewOutlined />
                    </IconButton>
                </Grid>
                <SortCard

                />
                <OrderCard

                />
                <Grid className='filter-card-button-container'>
                    <Button className='filter-card-button'>Apply</Button>
                </Grid>
            </Grid>
            <Box sx={{
                width: '80vw',
                typography: 'body1',
                justifyContent: 'center'
            }}>
                <TabContext value={tabValue} >
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabValue} variant='fullWidth' centered >
                            <Tab label="All Todos" value="1" className='tab_item_style' />
                            <Tab label="Marked Todos" value="2" className='tab_item_style' />
                            <Tab label="Finished Todos" value="3" className='tab_item_style' />
                        </TabList>
                    </Box>
                    <Box style={{ overflow: 'auto', height: '80vh', width: '80vw' }}>
                        <TabPanel value="1" >
                            <FlatList
                                list={data}
                                renderItem={renderItem}
                                renderWhenEmpty={renderWhenEmpty}
                                renderOnScroll
                                displayGrid
                                minColumnWidth={columnWidth}

                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <FlatList
                                list={favoritedData}
                                renderItem={renderItem}
                                renderWhenEmpty={renderWhenEmpty}
                                renderOnScroll
                                displayGrid
                                minColumnWidth={columnWidth}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <FlatList
                                list={finishedData}
                                renderItem={renderItem}
                                renderWhenEmpty={renderWhenEmpty}
                                renderOnScroll
                                displayGrid
                                minColumnWidth={columnWidth}
                            />
                        </TabPanel>
                    </Box>
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
    );
}
