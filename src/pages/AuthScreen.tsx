import { useState, useRef, FC } from 'react';
import {
  Box,
  Stack,
  Typography,
  Button,
  TextField,
  Card,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, SIGNUP_USER } from '../graphql/mutations';
import { IAuthScreen } from './models';

export const AuthScreen: FC<IAuthScreen> = ({ setLoggedIn }) => {
  const [showLogin, setShowLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const authForm = useRef<HTMLFormElement>(null);
  const [signupUser, { data: signUpData, loading: l1, error: e1 }] =
    useMutation(SIGNUP_USER);

  const [loginUser, { loading: l2, error: e2 }] = useMutation(LOGIN_USER, {
    onCompleted(data) {
      console.log(data);
      localStorage.setItem('jwt', data.signinUser.token);
      setLoggedIn(true);
    },
  });

  if (l1 || l2) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <CircularProgress />
          <Typography variant="h6">Authenticating...</Typography>
        </Box>
      </Box>
    );
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    if (showLogin) {
      loginUser({
        variables: {
          userSignin: formData,
        },
      });
    } else {
      signupUser({
        variables: {
          userNew: formData,
        },
      });
    }
    console.log(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="80vh"
      ref={authForm}
    >
      <Card variant="outlined" sx={{ padding: '10px' }}>
        <Stack direction="column" spacing={2} sx={{ width: '400px' }}>
          {signUpData && (
            <Alert severity="success">
              Welcome {signUpData.signupUser.firstName} | 👽
            </Alert>
          )}
          {e1 && <Alert severity="error">{e1.message}</Alert>}
          {e2 && <Alert severity="error">{e2.message}</Alert>}
          <Typography variant="h5">
            Please {showLogin ? 'Login' : 'Signup'}
          </Typography>
          {!showLogin && (
            <>
              <TextField
                name="firstName"
                label="Fist Name"
                variant="standard"
                onChange={handleChange}
                required
              />
              <TextField
                name="lastName"
                label="Last Name"
                variant="standard"
                onChange={handleChange}
                required
              />
            </>
          )}
          <TextField
            type="email"
            name="email"
            label="Email"
            variant="standard"
            onChange={handleChange}
            required
          />
          <TextField
            type="password"
            name="password"
            label="Password"
            variant="standard"
            onChange={handleChange}
            required
          />
          <Typography
            textAlign="center"
            variant="subtitle1"
            onClick={() => {
              setShowLogin(!showLogin);
              setFormData({});
              authForm?.current?.reset();
            }}
          >
            {showLogin ? 'Signup' : 'Login'}
          </Typography>
          <Button variant="outlined" type="submit">
            Submit
          </Button>
        </Stack>
      </Card>
    </Box>
  );
};
