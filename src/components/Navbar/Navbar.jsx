import * as React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography  
} from '@mui/material';

import {
  Logout as LogoutIcon,
  Menu as MenuIcon
} from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function SearchAppBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const LogoutHandle = () => {
    navigate('/')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: '#ED6C02'}} >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            TODO LIST
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            onClick={LogoutHandle}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}