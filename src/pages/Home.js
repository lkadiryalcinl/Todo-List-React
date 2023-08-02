import * as React from 'react'
import Navbar from '../components/Navbar'
import { Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoListCard from '../components/TodoListCard';
import Dialog from '../components/Dialog'
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { FetchData } from '../utils/utils';

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
        <Grid style={{
            backgroundImage: 'url("https://img.freepik.com/premium-vector/orange-light-geometric-background_9111-1311.jpg")',
            backgroundSize: 'cover',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Navbar />
            <Grid
                marginY={2}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <IconButton style={{ backgroundColor: '#F5A623' }}>
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
            <TodoListCard userId={userId} />
        </Grid>
    )
}

export default Home;