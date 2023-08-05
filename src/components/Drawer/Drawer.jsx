import * as React from 'react'
import {
    Button,
    Drawer,
    Grid,
    Link,
    Typography
} from '@mui/material'

import './Drawer.css'

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
                <Grid className='drawer-top'>
                    <Typography className='drawer-top-title'>
                        To do
                    </Typography>
                </Grid>
                <Grid className='drawer-content'>
                    <Button className='drawer-content-button'>
                        <Link
                            href="/dashboard"
                            className='drawer-content-button-text'
                        >
                            Dashboard
                        </Link>
                    </Button>
                    <Button className='drawer-content-button'>
                        <Link
                            href="/accountSettings"
                            className='drawer-content-button-text'
                        >
                            Account Settings
                        </Link>
                    </Button>
                </Grid>
            </Grid>
        </Drawer>
    )
}

export default DrawerComp