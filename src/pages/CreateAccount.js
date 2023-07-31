import * as React from 'react';
import { Grid, TextField, Button, Link, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { HandleAuth } from '../utils/utils';
import { Formik } from 'formik';
import { Lock } from '@mui/icons-material';
import { SignUpSchema } from '../validation/validation';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <Grid style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url("https://img.freepik.com/premium-vector/orange-light-geometric-background_9111-1311.jpg")',
      backgroundSize: 'cover'
    }}>
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
            <Grid
              style={{
                height: '10vh',
                width: '30vw',
                backgroundColor: '#F5A623',
                display: 'flex',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography
                variant='h5'
                color={'white'}
              >
                To-do List Login Page
              </Typography>
            </Grid>
            <Grid style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-evenly',
              padding: 8,
              border: '4px solid orange',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
              backgroundColor: 'whitesmoke'
            }}
              container
              height={'70vh'}
              width={'30vw'}
            >
              <Grid
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
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
              <Grid style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <TextField
                  color={errors.username && values.username.length !== 0 ? "error" : ""}
                  label={errors.username && values.username.length !== 0 ? errors.username : 'Username'}
                  type="text"
                  name="username"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                />

                <TextField
                  color={errors.email && values.email.length !== 0 ? "error" : ""}
                  label={errors.email && values.email.length !== 0 ? errors.email : 'E-mail'}
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  style={{ marginTop: '1rem' }}
                />

                <TextField
                  color={errors.password && values.password.length !== 0 ? "error" : ""}
                  label={errors.password && values.password.length !== 0 ? errors.password : 'Password'}
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  style={{ marginTop: '1rem' }}
                />

                <TextField
                  color={errors.repass && values.repass.length !== 0 ? "error" : ""}
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
                  style={{
                    marginTop: 16,
                    color: 'white',
                    backgroundColor: '#F5A623'
                  }}
                >
                  Submit
                </Button>
              </Grid>
              <Link
                href="/"
                underline="hover"
                color={'black'}
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