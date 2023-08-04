import * as React from 'react'
import { Grid } from '@mui/material';
import { useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom'
import { FetchData } from '../utils/utils';
import Navbar from '../components/Navbar/Navbar'
import TodoBoard from '../components/TodoBoard/TodoBoard';

import './Home.css'

const Home = () => {
    const dispatch = useDispatch();
    const location = useLocation()
    const userId = location.state.userId

    React.useEffect(() => {
        FetchData(dispatch, userId, "todo?UserId=");
        FetchData(dispatch, userId, "favtodo/elements/");
        FetchData(dispatch, userId, "finishedtodo/elements/");
    }, [userId,dispatch])


    return (
        <Grid className='home-page-container'>
            <Navbar />
            <TodoBoard userId={userId} />
        </Grid>
    )
}

export default Home;