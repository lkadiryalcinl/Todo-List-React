import * as React from 'react';
import { Grid, TextField, Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { Lock } from '@mui/icons-material';
import { HandleAuth } from '../../utils/utils';
import { SignUpSchema } from '../../validation/validation';

import './CreateAccount.css'

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid className='create-account-page-container'>
      <Formik
        initialValues={{
          username: "",
          password: "",
          email: "",
          repass: ""
        }}
        validationSchema={SignUpSchema}
        onSubmit={(values, { setSubmitting }) => {
          HandleAuth(navigate, dispatch, values, "createAccount")
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
              <Grid className='form-style'>
                <Lock
                  sx={{
                    marginY: 2
                  }}
                />
                <Typography
                  variant='h5'
                  color={'black'}
                >
                  Create Account
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
                href="/"
                className='link'
              >
                Have an account.
              </Link>
            </Grid>
          </Grid>
        )}
      </Formik>
    </Grid>
  );
};

export default Login;