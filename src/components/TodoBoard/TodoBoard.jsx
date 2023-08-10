
import {
    Grid,
    Box,
    Tab,
    IconButton
} from '@mui/material';
import { useEffect,useState } from "react";

import {
    Add
} from '@mui/icons-material'

import {
    TabContext,
    TabList,
    TabPanel
} from '@mui/lab'

import './TodoBoard.css';
import { GetTodoByID, FetchData } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '../Dialog/Dialog'
import FlatList from 'flatlist-react'
import TodoCard from '../TodoCard/TodoCard';
import FilterAside from '../FilterAside/FilterAside';
import Search from '../Search/Search';

export default function TodoBoard() {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userID)

    //flatlist lists
    const [data, setData] = useState([]);
    const [favData, setFavData] = useState([]);
    const [finData, setFinData] = useState([]);
    
    const [updateTodoDialog, setUpdateTodoDialog] = useState(false);
    const [AddTodoDialog, setAddTodoDialog] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    
    const [info, setInfo] = useState(false);
    const [tabValue, setTabValue] = useState('1');
    
    const [userAction, setUserAction] = useState(false);
    const [columnWidth, setColumnWidth] = useState('40vw');

    const [radioSortValue, setRadioSortValue] = useState('title');
    const [radioOrderValue, setRadioOrderValue] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleInfo = () => {
        setInfo(!info)
    }

    const handleAddDialog = () => {
        setAddTodoDialog(!AddTodoDialog);
    }

    const handleUpdateDialog = async (todoID) => {
        todoID !== undefined ? await GetTodoByID(todoID).then((data) => {
            setSelectedTodo(data)
        }).then(() => {
            setUpdateTodoDialog(true)
        }) :
            setUpdateTodoDialog(false)
    }

    const handleAction = () => {
        setUserAction(!userAction)
    }

    const renderWhenEmpty = () => {
        return <div style={{ color: 'black', textAlign: 'center' }}>This List is Empty...</div>
    }
    const fetchTodos = async () => {
        if (tabValue === '1')
            setData(await FetchData(userId, "todo?UserId="))
        else if (tabValue === '2')
            setFavData(await FetchData(userId, "todo/favtodo/"))
        else
            setFinData(await FetchData(userId, "todo/finishedtodo/"))
    }

    useEffect(() => {


        fetchTodos();
    }, [tabValue, userAction, userId])

    return (
        <>
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
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleTabValue} centered className='tablist-container'>
                                <Tab label="All Todos" value="1" className='tab_item_style' />
                                <Tab label="Marked Todos" value="2" className='tab_item_style' />
                                <Tab label="Finished Todos" value="3" className='tab_item_style' />
                            </TabList>
                        </Box>
                        <Search value={searchTerm} setValue={setSearchTerm} />
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'auto',
                            height: '80vh',
                            width: '80vw',
                        }}>
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
                                            handleInfo={handleInfo}
                                            handleAction={handleAction}
                                        />}
                                    renderWhenEmpty={renderWhenEmpty}
                                    displayGrid
                                    minColumnWidth={columnWidth}
                                    sort={{
                                        by: radioSortValue,
                                        caseInsensitive: true,
                                        descending: Boolean(radioOrderValue)
                                    }}
                                    search={{
                                        by: "title",
                                        term: searchTerm,
                                        caseInsensitive: true,
                                        minCharactersCount: 1,
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value="2">
                                <FlatList
                                    list={favData}
                                    renderItem={(Todo) =>
                                        <TodoCard
                                            key={Todo.todoID}
                                            Todo={Todo}
                                            dispatch={dispatch}
                                            userId={userId}
                                            handleUpdateDialog={handleUpdateDialog}
                                            handleInfo={handleInfo}
                                            handleAction={handleAction}
                                        />}
                                    renderWhenEmpty={renderWhenEmpty}
                                    displayGrid
                                    minColumnWidth={columnWidth}
                                    sort={{
                                        by: radioSortValue,
                                        caseInsensitive: true,
                                        descending: Boolean(radioOrderValue)
                                    }}
                                    search={{
                                        by: "title",
                                        caseInsensitive: true
                                    }}
                                />
                            </TabPanel>
                            <TabPanel value="3">
                                <FlatList
                                    list={finData}
                                    renderItem={(Todo) =>
                                        <TodoCard
                                            key={Todo.todoID}
                                            Todo={Todo}
                                            dispatch={dispatch}
                                            userId={userId}
                                            handleUpdateDialog={handleUpdateDialog}
                                            handleInfo={handleInfo}
                                            handleAction={handleAction}
                                        />}
                                    renderWhenEmpty={renderWhenEmpty}
                                    displayGrid
                                    minColumnWidth={columnWidth}
                                    sort={{
                                        by: radioSortValue,
                                        caseInsensitive: true,
                                        descending: Boolean(radioOrderValue)
                                    }}
                                    search={{
                                        by: "title",
                                        caseInsensitive: true
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
                    info={info}
                />
                <Dialog
                    dialog={AddTodoDialog}
                    changeDialog={() => handleAddDialog()}
                    dispatch={dispatch}
                    type={false}
                    userId={userId}
                />
            </Grid>
            <Grid
                className='todo-add-button'
            >
                <IconButton style={{ backgroundColor: '#53469c' }} sx={{ marginY: 2, marginRight: '3%' }}>
                    <Add onClick={() => {
                        handleAddDialog()
                    }}
                        style={{
                            color: 'white'
                        }}
                    />
                </IconButton>
            </Grid>
        </>

    );
}
