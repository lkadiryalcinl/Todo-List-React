import {useState} from 'react';
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
  const [openDrawer, setOpenDrawer] = useState(false)

  return (
    <>
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
              sx={{ flexGrow: 1 }}
            >
              TODO LIST
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </>


  );
}