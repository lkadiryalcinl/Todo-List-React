import * as React from 'react'
import Navbar from '../components/Navbar'
import { Button, Grid, IconButton } from '@mui/material';
import { Add } from '@mui/icons-material';
import TodoListCard from '../components/TodoListCard';
import Dialog from '../components/Dialog'
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { FetchData, FetchFavData, FetchFinishedData } from '../utils/utils';

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const userId = location.state.userId
    const [AddTodoDialog, setAddTodoDialog] = React.useState(false);

    const [showFav, setShowFav] = React.useState(false);
    const [showFinished, setShowFinished] = React.useState(false);

    React.useEffect(() => {
        FetchData(dispatch, userId);
        FetchFavData(dispatch,userId);
        FetchFinishedData(dispatch,userId);
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
                    <Dialog dialog={AddTodoDialog} changeDialog={() => handleAddDialog()} dispatch={dispatch} type={false} userId={userId} />
                </IconButton>
            </Grid>
            <Button onClick={() => setShowFav(!showFav)}>
                Show Just Favs
            </Button>
            <Button onClick={() => setShowFinished(!showFinished)}>
                Show Just Finished
            </Button>
            <TodoListCard userId={userId} showFav={showFav} showFinished={showFinished} />
        </Grid>
    )
}

export default Home;