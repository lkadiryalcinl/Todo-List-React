import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography
} from '@mui/material';

import {
  Menu as MenuIcon
} from '@mui/icons-material';

import Drawer from '../Drawer/Drawer';
import './Navbar.css'

export default function SearchAppBar() {
  const [openDrawer, setOpenDrawer] = React.useState(false)

  return (
    <Box>
      <AppBar
        position="static"
        className='navbar-container'
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color='inherit'
            sx={{ mr: 2 }}
            onClick={() => setOpenDrawer(!openDrawer)}
          >
            <MenuIcon
            />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TODO LIST
          </Typography>
        </Toolbar>
        <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
      </AppBar>
    </Box>
  );
}