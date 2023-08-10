import * as React from 'react';

import {
  Grid,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  AlertTitle,
} from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { Lock } from '@mui/icons-material';
import { HandleAuth, ActivateUser } from '../../utils/utils';
import { LoginSchema } from '../../validation/validation';

import AlertDialog from '../../components/Dialog/AlertDialog/AlertDialog'
import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState("");
  const [UserID, setUserID] = React.useState(-1)
  const [openAlert, setOpenAlert] = React.useState(false)
  const [again, setAgain] = React.useState(false)

  const userID = useSelector(state => state.user.userID)
  const handleOption1Click = () => {
    ActivateUser(dispatch, navigate, UserID)
    setOpenAlert(false);
  };

  const handleOption2Click = () => {
    setOpenAlert(!openAlert);
  };

  React.useEffect(() => {
    if (alert === "USER_DEACTIVE")
      setOpenAlert(!openAlert)
  }, [alert, again])

  React.useEffect(() => {
    if (userID !== -1)
      navigate('/dashboard')
  }, [])

  return (

    <Grid container className='login-page-container'>
      {alert.length !== 0 && <Alert
        severity={alert === "USER_FOUND" ? "success" : alert === "USER_DEACTIVE" ? "warning" : "error"}
        style={{
          position: 'absolute',
          top: 8,
        }}
      >
        <AlertTitle>{alert === "USER_FOUND" ? "Success" : alert === "USER_DEACTIVE" ? "User Deactive" : "This user not found"}</AlertTitle>
        <strong>{alert === "USER_FOUND" ? "success" : alert === "USER_DEACTIVE" ? "You need to activate your account" : "Please check username or password"}</strong>
      </Alert>}
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          const result = await HandleAuth(navigate, dispatch, values, "Login")
          setAlert(result.text)
          setUserID(result.userID)
          setAgain(!again)
          setSubmitting(false)
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <Grid>
            <Grid container className='form-header-container'>
              <Typography
                variant='h5'
                color={'white'}
              >
                To-do List Login Page
              </Typography>
            </Grid>
            <Grid
              className='form-content-container'
              container
            >
              <Grid
                className='form-style'>
                <Lock
                  sx={{
                    marginY: 2
                  }}
                />
                <Typography
                  variant='h5'
                  color={'black'}
                >
                  Welcome
                </Typography>
              </Grid>
              <Grid container className='form-style'>
                <TextField
                  label={errors.username && values.username.length !== 0 ? errors.username : 'Username'}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />

                <TextField
                  label={errors.password && values.password.length !== 0 ? errors.password : 'Password'}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{ marginTop: '1rem' }}
                />

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className='form-button'
                >
                  Submit
                </Button>
              </Grid>
              <Link
                href="/createAccount"
                underline="always"
                className='link'
              >
                Don't have an account yet.
              </Link>
            </Grid>
          </Grid>
        )
        }
      </Formik >
      <AlertDialog
        title={"Your Account is Deactive"}
        description={"Do you want to activate your account?"}
        open={openAlert}
        setOpen={setOpenAlert}
        option1={handleOption1Click}
        option2={handleOption2Click}
      />
    </Grid >
  );
};

export default Login;