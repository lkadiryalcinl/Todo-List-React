import {useEffect} from 'react'
import { Grid } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import TodoBoard from '../../components/TodoBoard/TodoBoard';

import './Dashboard.css'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const userId = useSelector(state => state.user.userID)
    const navigate = useNavigate();

    useEffect(() => {
        if (userId === -1)
            navigate('/')
    }, [navigate,userId])
    
    return (
        <Grid className='dashboard-page-container'>
            <Navbar />
            <TodoBoard />
        </Grid>
    )
}

export default Dashboard;