import * as React from 'react'
import {
    Grid,
    Typography,
    TextField,
    Button
} from '@mui/material'

import {
    Edit
} from '@mui/icons-material'

import { Formik } from 'formik';
import { SignUpSchema } from '../../validation/validation';
import Navbar from '../../components/Navbar/Navbar'

import './AccountSettings.css'
import AccountButton from './AccountButton/AccountButton'
import { useSelector } from 'react-redux';

import { GetUserByID } from '../../utils/utils'

const accountSettings = () => {
    
    const userId = useSelector(state => state.user.userID)
    const [userData, setUserData] = React.useState([]);

    React.useEffect(() => {
        const fetchUser = async () => {
            setUserData(await GetUserByID(userId))
        }
        fetchUser();
        console.log(userData);
    }, [])

    return (
        <>
            <Navbar />
            <Grid container className='account-settings-container'>
                <Grid container className='account-container'>
                    <Grid className='left-container'>
                        <AccountButton
                            icon={<Edit />}
                            label={"Edit User"}
                        />
                    </Grid>
                    <Grid className='right-container'>
                        <Grid className='right-container-title'>
                            <Typography>
                                Title
                            </Typography>
                        </Grid>
                        <Grid className='right-container-content'>
                            <Formik
                                initialValues={{
                                    username: "",
                                    password: "",
                                    email: "",
                                    repass: ""
                                }}
                                validationSchema={SignUpSchema}
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
                                                color={errors.username && values.username.length !== 0 ? "error" : "warning"}
                                                label={errors.username && values.username.length !== 0 ? errors.username : 'Username'}
                                                type="text"
                                                name="username"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.username}
                                            />

                                            <TextField
                                                color={errors.email && values.email.length !== 0 ? "error" : "warning"}
                                                label={errors.email && values.email.length !== 0 ? errors.email : 'E-mail'}
                                                type="text"
                                                name="email"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.email}
                                                style={{ marginTop: '1rem' }}
                                            />

                                            <TextField
                                                color={errors.password && values.password.length !== 0 ? "error" : "warning"}
                                                label={errors.password && values.password.length !== 0 ? errors.password : 'Password'}
                                                type="password"
                                                name="password"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.password}
                                                style={{ marginTop: '1rem' }}
                                            />

                                            <TextField
                                                color={errors.repass && values.repass.length !== 0 ? "error" : "warning"}
                                                label={errors.repass && values.repass.length !== 0 ? errors.repass : 'Password Again'}
                                                type="password"
                                                name="repass"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.repass}
                                                style={{ marginTop: '1rem' }}
                                            />
                                        </Grid>

                                        <Grid>
                                            <Button
                                                type="submit"
                                                style={{
                                                    color: 'white',
                                                    backgroundColor: '#ED6C02'
                                                }}
                                            >
                                                Save Changes
                                            </Button>
                                        </Grid>
                                    </Grid>

                                )}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

export default accountSettings;