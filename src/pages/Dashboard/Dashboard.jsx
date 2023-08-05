import * as React from 'react'
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from '../../utils/utils';
import Navbar from '../../components/Navbar/Navbar'
import TodoBoard from '../../components/TodoBoard/TodoBoard';

import './Dashboard.css'

const Dashboard = () => {
    const dispatch = useDispatch();
    const userId = useSelector(state => state.user.userID)
    
    React.useEffect(() => {
        FetchData(dispatch, userId, "todo?UserId=");
        FetchData(dispatch, userId, "favtodo/elements/");
        FetchData(dispatch, userId, "finishedtodo/elements/");
    }, [userId,dispatch])


    return (
        <Grid className='dashboard-page-container'>
            <Navbar />
            <TodoBoard />
        </Grid>
    )
}

export default Dashboard;