import { useEffect } from 'react'
import { Grid } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import TodoBoard from '../../components/TodoBoard/TodoBoard';

import './Dashboard.css'
import { GetUserByID } from '../../utils/utils';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userId = useSelector(state => state.user.userID);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const fetchUser = async () => {
        const fetchedUser = await GetUserByID(userId);
        dispatch({ type: "SET_USER", payload: fetchedUser })
    }

    useEffect(() => {
        fetchUser();
    }, [dispatch])

    useEffect(() => {
        if (userId === -1)
            navigate('/')
    }, [navigate, userId])

    return (
        <Grid className='dashboard-page-container'>
            <Navbar />
            <TodoBoard />
        </Grid>
    )
}

export default Dashboard;