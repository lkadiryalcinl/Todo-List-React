import {
    useEffect,
    useState
} from 'react'

import './AccountSettings.css'
import '../../components/TodoBoard/TodoBoard.css'
import {
    Grid,
    Typography,
    TextField,
    Button,
    Tab,
    Alert,
    AlertTitle
} from '@mui/material'


import {
    TabContext,
    TabPanel,
    TabList
} from '@mui/lab'
import { Formik } from 'formik';

import { ChangePasswordValid, UserUpdateValid } from '../../validation/validation';
import Navbar from '../../components/Navbar/Navbar'
import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog';
import { GetUserByID, RemoveUser, ChangePassword, Edit, EditUser } from '../../utils/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



const AccountSettings = () => {
    const [tabValue, setTabValue] = useState('1');
    const [openAlert, setOpenAlert] = useState(false);
    const [alert, setAlert] = useState("");
    const [count, setCount] = useState(0);

    const user = useSelector(state => state.user.user)
    const userId = useSelector(state => state.user.userID)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleTabValue = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleOption1Click = () => {
        RemoveUser(dispatch, navigate, userId)
        setOpenAlert(false);
    };

    const handleOption2Click = () => {
        setOpenAlert(false);
    };

    const fetchUser = async () => {
        const fetchedUser = await GetUserByID(userId);
        dispatch({ type: "SET_USER", payload: fetchedUser })
    }

    useEffect(() => {
        fetchUser();
    }, [count,dispatch])

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
                                        username: user?.username,
                                        email: user?.email,
                                        password: "",
                                    }}
                                    validationSchema={UserUpdateValid}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        const res = await EditUser(values, userId)
                                        setCount(count + 1)
                                        setAlert(res)
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
                                        <Grid className='account-form-style' >
                                            <Grid container className='form-input-container'>
                                                <Typography
                                                    variant='h4'
                                                    className='account-form-title'
                                                >Edit User
                                                </Typography>
                                                <TextField
                                                    className='account-form-input'
                                                    label={errors.username ? errors.username : 'Username'}
                                                    type="text"
                                                    name="username"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.username}
                                                />

                                                <TextField
                                                    className='account-form-input'
                                                    label={errors.email ? errors.email : 'E-mail'}
                                                    type="text"
                                                    name="email"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.email}
                                                />

                                                <TextField
                                                    className='account-form-input'
                                                    label={errors.password ? errors.password : 'Confirm Password'}
                                                    type="password"
                                                    name="password"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.password}
                                                />
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    className='account-form-button'
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
                                        className='account-delete-user-button'
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
                                    validationSchema={ChangePasswordValid}
                                    onSubmit={async (values, { setSubmitting }) => {
                                        const res = await ChangePassword(values, userId)
                                        
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
                                                <Typography
                                                    variant='h4'
                                                    className='account-form-title'
                                                >Change Password
                                                </Typography>
                                                <TextField
                                                    className='account-form-input'
                                                    label={errors.oldpass && values.oldpass.length !== 0 ? errors.oldpass : 'Old Password'}
                                                    type="password"
                                                    name="oldpass"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.oldpass}
                                                />

                                                <TextField
                                                    className='account-form-input'
                                                    label={errors.newpass && values.newpass.length !== 0 ? errors.newpass : 'New Password'}
                                                    type="password"
                                                    name="newpass"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.newpass}
                                                />

                                                <TextField
                                                    className='account-form-input'
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
                                                    className='account-form-button'
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
            {alert?.length !== 0 && <Alert
                severity={alert === "Success" ? "success" : "warning"}
                style={{
                    position: 'absolute',
                    top: '5%',
                    right: '30%',
                    left: '40%'
                }}
            >
                <AlertTitle>{alert === "Success" ? "Success" : alert === "PasswordWrong" ? "Password Wrong" : "Warning"}</AlertTitle>
                <strong>{alert === "Success" ? "The user succesfully updated." : alert === "PasswordWrong" ? "The password you typed is wrong" : "E-mail or Username taken."}</strong>
            </Alert>}
        </>
    )
}

export default AccountSettings;
