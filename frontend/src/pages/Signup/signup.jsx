import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const signUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register/', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage('Sign-up successful! You can now log in.');
      } else {
        setError('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <div style={{ marginTop: '180px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h4" style={{ fontWeight: 'bold', marginBottom: '16px' }}>
          Create an Account
        </Typography>
        <form onSubmit={signUp} style={{ width: '100%', marginTop: '8px' }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '24px' }}
          >
            Sign Up
          </Button>
          {error && <Typography color="error" style={{ marginTop: '16px' }}>{error}</Typography>}
          {successMessage && <Typography style={{ marginTop: '16px' }}>{successMessage}</Typography>}
        </form>
        <Link to="/login" style={{ marginTop: '16px' }}>
          Already have an account? Sign In
        </Link>
      </div>
    </Container>
  );
};

export default SignUp;