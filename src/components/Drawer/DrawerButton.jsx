import {useState} from 'react'

import {
    Grid,
    Icon,
    Link,
    Typography
} from '@mui/material'

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import AlertDialog from '../Dialog/AlertDialog/AlertDialog';

import './DrawerButton.css'

const DrawerButton = ({ title, href, logout, icon }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openAlert, setOpenAlert] = useState(false)

    const handleOption1Click = () => {
        navigate(href)
        dispatch({ type: 'LOGOUT' })
        setOpenAlert(false);
    };

    const handleOption2Click = () => {
        setOpenAlert(false);
    };

    return (
        <Grid
            className='drawer-button-container'
            onClick={() => {
                if (logout) {
                    setOpenAlert(!openAlert)
                }
                else
                    navigate(href)
            }}>
            <Icon
                color='inherit'
            >
                {icon}
            </Icon>
            <Link
                className='drawer-button-text-container'
                underline='none'
            >
                <Typography className='drawer-button-text'>
                    {title}
                </Typography>
            </Link>
            <AlertDialog
                title={"Are you sure?"}
                description={"Are you really sure about it?"}
                open={openAlert}
                setOpen={setOpenAlert}
                option1={handleOption1Click}
                option2={handleOption2Click}
            />
        </Grid>
    )
}

export default DrawerButton