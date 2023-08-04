import * as React from 'react';

import {
    Grid,
    Box,
    Tab,
    IconButton
} from '@mui/material';

import {
    Add
} from '@mui/icons-material'

import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'

import './TodoBoard.css';
import { GetTodoByID, } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../Dialog/Dialog'
import FlatList from 'flatlist-react'
import TodoCard from '../TodoCard/TodoCard';
import FilterAside from '../FilterAside/FilterAside';

export default function TodoBoard({ userId }) {
    const dispatch = useDispatch();

    const data = useSelector(state => state.todo.data)
    const favoritedData = useSelector(state => state.todo.favoritedData)
    const finishedData = useSelector(state => state.todo.finishedData)

    const [updateTodoDialog, setUpdateTodoDialog] = React.useState(false);
    const [selectedTodo, setSelectedTodo] = React.useState(null);
    const [tabValue, setTabValue] = React.useState('1');
    const [columnWidth, setColumnWidth] = React.useState('40vw')
    const [radioSortValue, setRadioSortValue] = React.useState('title');
    const [radioOrderValue, setRadioOrderValue] = React.useState('');
    const [AddTodoDialog, setAddTodoDialog] = React.useState(false);

    const handleTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleAddDialog = () => {
        setAddTodoDialog(!AddTodoDialog);
    }

    const handleUpdateDialog = async (todoID) => {
        todoID !== undefined ? await GetTodoByID(todoID, "todo").then((data) => {
            setSelectedTodo(data)
        }).then(() => {
            setUpdateTodoDialog(true)
        }) :
            setUpdateTodoDialog(false)
    }

    React.useEffect(() => {
        console.log(Boolean(radioOrderValue));
    }, [radioOrderValue])

    const renderWhenEmpty = () => {
        return <div style={{ color: 'black', textAlign: 'center' }}>This List is Empty...</div>
    }

    return (
        <Grid className='todo-board-container'>
            <FilterAside
                columnWidth={columnWidth}
                radioOrderValue={radioOrderValue}
                radioSortValue={radioSortValue}
                setColumnWidth={setColumnWidth}
                setRadioOrderValue={setRadioOrderValue}
                setRadioSortValue={setRadioSortValue}
            />
            <Box sx={{
                width: '85vw',
                typography: 'body1',
                justifyContent: 'center'
            }}>
                <TabContext value={tabValue} >
                    <Grid
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton style={{ backgroundColor: '#ED6C02' }} sx={{ marginY: 2,marginRight:'3%' }}>
                            <Add onClick={() => {
                                handleAddDialog()
                            }}
                                style={{
                                    color: 'white'
                                }}
                            />
                        </IconButton>
                    </Grid>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleTabValue} centered className='tablist-container'>
                            <Tab label="All Todos" value="1" className='tab_item_style' />
                            <Tab label="Marked Todos" value="2" className='tab_item_style' />
                            <Tab label="Finished Todos" value="3" className='tab_item_style' />
                        </TabList>
                    </Box>
                    <Box style={{ overflow: 'auto', height: '75vh', width: '80vw' }}>

                        <TabPanel value="1" >
                            <FlatList
                                list={data}
                                renderItem={(Todo) =>
                                    <TodoCard
                                        key={Todo.todoID}
                                        Todo={Todo}
                                        dispatch={dispatch}
                                        userId={userId}
                                        handleUpdateDialog={handleUpdateDialog}
                                    />}
                                renderWhenEmpty={renderWhenEmpty}
                                displayGrid
                                minColumnWidth={columnWidth}
                                sort={{
                                    by: radioSortValue,
                                    caseInsensitive: true,
                                    descending: Boolean(radioOrderValue)
                                }}

                            />
                        </TabPanel>
                        <TabPanel value="2">
                            <FlatList
                                list={favoritedData}
                                renderItem={(Todo) =>
                                    <TodoCard
                                        key={Todo.todoID}
                                        Todo={Todo}
                                        dispatch={dispatch}
                                        userId={userId}
                                        handleUpdateDialog={handleUpdateDialog}
                                    />}
                                renderWhenEmpty={renderWhenEmpty}
                                displayGrid
                                minColumnWidth={columnWidth}
                                sort={{
                                    by: radioSortValue,
                                    caseInsensitive: true,
                                    descending: Boolean(radioOrderValue)
                                }}
                            />
                        </TabPanel>
                        <TabPanel value="3">
                            <FlatList
                                list={finishedData}
                                renderItem={(Todo) =>
                                    <TodoCard
                                        key={Todo.todoID}
                                        Todo={Todo}
                                        dispatch={dispatch}
                                        userId={userId}
                                        handleUpdateDialog={handleUpdateDialog}
                                    />}
                                renderWhenEmpty={renderWhenEmpty}
                                displayGrid
                                minColumnWidth={columnWidth}
                                sort={{
                                    by: radioSortValue,
                                    caseInsensitive: true,
                                    descending: Boolean(radioOrderValue)
                                }}
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
            <Dialog
                dialog={AddTodoDialog}
                changeDialog={() => handleAddDialog()}
                dispatch={dispatch}
                type={false}
                userId={userId} />
        </Grid>
    );
}
