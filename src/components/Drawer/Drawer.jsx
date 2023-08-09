import * as React from 'react'

import {
    Drawer,
    Grid,
    Typography
} from '@mui/material'

import {
    Logout,
    ManageAccounts,
    Dashboard
} from '@mui/icons-material'

import './Drawer.css'
import DrawerButton from './DrawerButton';

const DrawerComp = ({ openDrawer, setOpenDrawer }) => {

    return (
        <Drawer
            anchor='left'
            open={openDrawer}
            onClose={() => {
                if (setOpenDrawer)
                    setOpenDrawer(!openDrawer)
            }}
        >
            <Grid className='drawer-container'>
                <Grid container className='drawer-top'>
                    <Typography className='drawer-top-title'>
                        Todo
                    </Typography>
                </Grid>
                <Grid className='drawer-content'>
                    <DrawerButton title={'Dashboard'} href={'/dashboard'} logout={false} icon={<Dashboard/>}/>
                    <DrawerButton title = {'Account Settings'} href={'/accountSettings'} logout={false} icon={<ManageAccounts/>}/>
                    <DrawerButton title={'Logout'} href={'/'} logout={true} icon={<Logout/>}/>
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default DrawerComp