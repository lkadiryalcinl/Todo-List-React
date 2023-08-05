import * as React from 'react';
import { Grid, TextField, Button, Typography, Link, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Lock } from '@mui/icons-material';
import { HandleAuth } from '../../utils/utils';
import { LoginSchema } from '../../validation/validation';

import './Login.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [alert, setAlert] = React.useState(false);
  
  return (

    <Grid className='login-page-container'>
      {alert &&
        <Alert
          severity="error"
          style={{
            position: 'absolute',
            top: 8,
          }}
        >
          <AlertTitle>Error</AlertTitle>
          This user not found — <strong>check your username or password</strong>
        </Alert>
      }
      <Formik
        initialValues={{
          username: "",
          password: ""
        }}
        validationSchema={LoginSchema}
        onSubmit={(values, { setSubmitting }) => {
          setAlert(HandleAuth(navigate, dispatch, values, "Login"))
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
          <Grid
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Grid className='form-header-container'>
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
              <Grid className='form-style'>
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
                  color={errors.password && values.password.length !== 0 ? "error" : "warning"}
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
                underline="hover"
                color={'black'}
              >
                Don't have an account yet.
              </Link>
            </Grid>
          </Grid>
        )
        }
      </Formik >
    </Grid >
  );
};

export default Login;