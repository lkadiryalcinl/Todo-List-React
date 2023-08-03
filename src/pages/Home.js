import * as React from 'react'
import Navbar from '../components/Navbar'
import { Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoBoard from '../components/TodoBoard';
import Dialog from '../components/Dialog'
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { FetchData } from '../utils/utils';

import './Home.css'

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const userId = location.state.userId
    const [AddTodoDialog, setAddTodoDialog] = React.useState(false);

    React.useEffect(() => {
        FetchData(dispatch, userId, "todo?UserId=");
        FetchData(dispatch, userId, "favtodo/elements/");
        FetchData(dispatch, userId, "finishedtodo/elements/");
    }, [])

    const handleAddDialog = () => {
        setAddTodoDialog(!AddTodoDialog);
    }

    return (
        <Grid className='home-page-container'>
            <Navbar />
            <Grid
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton style={{ backgroundColor: '#ED6C02' }} sx={{ marginY: 2 }}>
                    <Add onClick={() => {
                        handleAddDialog()
                    }}
                        style={{
                            color: 'white'
                        }}
                    />
                </IconButton>
                <Dialog dialog={AddTodoDialog} changeDialog={() => handleAddDialog()} dispatch={dispatch} type={false} userId={userId} />
            </Grid>
            <TodoBoard userId={userId} />
        </Grid>
    )
}

export default Home;