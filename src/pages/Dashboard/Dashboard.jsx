import * as React from 'react'
import { Grid } from '@mui/material';
import Navbar from '../../components/Navbar/Navbar'
import TodoBoard from '../../components/TodoBoard/TodoBoard';

import './Dashboard.css'

const Dashboard = () => {

    return (
        <Grid className='dashboard-page-container'>
            <Navbar />
            <TodoBoard />
        </Grid>
    )
}

export default Dashboard;