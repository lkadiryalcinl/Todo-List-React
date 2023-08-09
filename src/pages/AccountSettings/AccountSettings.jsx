import {
    useState,
    useEffect
} from 'react'
import {
    Grid,
    Typography,
    TextField,
    Button,
    Tab,
    Box,
    Alert,
    AlertTitle
} from '@mui/material'

import {
    Edit
} from '@mui/icons-material'

import {
    TabContext,
    TabPanel,
    TabList
} from '@mui/lab'
import { Formik } from 'formik';

import { ChangePassword, UserUpdateValid } from '../../validation/validation';
import Navbar from '../../components/Navbar/Navbar'
import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog';

import './AccountSettings.css'
import '../../components/TodoBoard/TodoBoard.css'

const AccountSettings = () => {
    const [tabValue, setTabValue] = useState('1');
    const [openAlert, setOpenAlert] = useState(false);
    const [alert, setAlert] = useState('');

    const handleTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOption1Click = () => {

        setOpenAlert(false);
    };

    const handleOption2Click = () => {

        setOpenAlert(false);
    };

    return (
        <>
            <Navbar />
            <Grid container className='account-settings-container'>
                <Grid className='account-container'>
                    <TabContext value={tabValue} >
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider', width: '15%' }} >
                            <TabList onChange={handleTabValue} centered className='tablist-container' orientation="vertical">
                                <Tab label="Edit User" value="1" className='tab_item_style' />
                                <Tab label="Change Password" value="2" className='tab_item_style' />
                                <Tab label="My Groups" value="3" className='tab_item_style' />
                            </TabList>
                        </Grid>
                        <Grid
                            className='panel-container-style'
                        >
                            <TabPanel value="1" >
                                <Formik
                                    initialValues={{
                                        username: "",
                                        email: "",
                                        password: "",
                                    }}
                                    validationSchema={UserUpdateValid}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setAlert('USER_CHANGED')
                                        console.log(values);
                                        setSubmitting(false)
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Grid className='account-form-style'>
                                            <Grid container className='form-input-container'>
                                                <TextField
                                                    label={errors.username && values.username.length !== 0 ? errors.username : 'Username'}
                                                    type="text"
                                                    name="username"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                />

                                                <TextField
                                                    label={errors.email && values.email.length !== 0 ? errors.email : 'E-mail'}
                                                    type="text"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />

                                                <TextField
                                                    label={errors.password && values.password.length !== 0 ? errors.password : 'Confirm Password'}
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    style={{
                                                        color: 'white',
                                                        backgroundColor: '#53469c'
                                                    }}
                                                >
                                                    Save Changes
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    )}
                                </Formik>
                                <Grid container className='delete-user-button-container'>
                                    <Button
                                        onClick={() => setOpenAlert(true)}
                                        style={{
                                            color: 'white',
                                            backgroundColor: 'rgb(235,20,0)',
                                            width: '40%'
                                        }}
                                    >
                                        Delete User
                                    </Button>
                                </Grid>
                            </TabPanel>
                            <TabPanel value="2">
                                <Formik
                                    initialValues={{
                                        oldpass: "",
                                        newpass: "",
                                        passagain: ""
                                    }}
                                    validationSchema={ChangePassword}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setSubmitting(false)
                                    }}
                                >
                                    {({
                                        values,
                                        errors,
                                        touched,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit,
                                        isSubmitting,
                                    }) => (
                                        <Grid className='account-form-style'>
                                            <Grid container className='form-input-container'>
                                                <TextField
                                                    label={errors.oldpass && values.oldpass.length !== 0 ? errors.oldpass : 'Old Password'}
                                                    type="password"
                                                    name="oldpass"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.oldpass}
                                                />

                                                <TextField
                                                    label={errors.newpass && values.newpass.length !== 0 ? errors.newpass : 'New Password'}
                                                    type="password"
                                                    name="newpass"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.newpass}
                                                />

                                                <TextField
                                                    label={errors.passagain && values.passagain.length !== 0 ? errors.passagain : 'New Password Again'}
                                                    type="password"
                                                    name="passagain"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.passagain}
                                                />
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    style={{
                                                        color: 'white',
                                                        backgroundColor: '#53469c'
                                                    }}
                                                >
                                                    Change Password
                                                </Button>
                                            </Grid>
                                        </Grid>

                                    )}
                                </Formik>
                            </TabPanel>
                            <TabPanel value="3">

                            </TabPanel>
                        </Grid>
                    </TabContext>
                </Grid>
            </Grid>
            <AlertDialog
                title={"Delete User"}
                description={"Are you really sure about it?"}
                open={openAlert}
                setOpen={setOpenAlert}
                option1={handleOption1Click}
                option2={handleOption2Click}
            />
            {alert.length !== 0 && <Alert
                severity={alert === "USER_CHANGED" ? "success" : "warning"}
                style={{
                    position: 'absolute',
                    top: '5%',
                    right: '30%',
                    left: '40%'
                }}
            >
                <AlertTitle>{alert === "USER_CHANGED" ? "Success" : "Warning"}</AlertTitle>
                <strong>{alert === "USER_CHANGED" ? "The user succesfully updated." : "An error occourd."}</strong>
            </Alert>}
        </>
    )
}

export default AccountSettings;
