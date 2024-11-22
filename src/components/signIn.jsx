import React, { useState } from 'react';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import useStore from '../store';

function SignIn(params) {
  const signIn = useStore(({ authSlice }) => authSlice.signinUser);
  const [email, setEmail] = useState('');
  const [password, setpw] = useState('');
  const navigate = useNavigate();

  const signingIn = async () => {
    await signIn({
      email,
      password,
    });
    const { authenticated } = useStore.getState().authSlice;
    if (authenticated) {
      navigate('/');
    }
  };

  const handleKey = (event) => {
    if (event.key === 'Enter') {
      signingIn();
    }
  };
  return (
    <div>
      <div className="signInContainer">
        <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" radius="xl" />
        <PasswordInput onKeyDown={handleKey} value={password} onChange={(e) => setpw(e.target.value)} label="Password" placeholder="Enter Passowrd" radius="xl" />
        <Button onClick={signingIn} radius="xl" color="#41093E"> Sign In</Button>
        <div> Dont have an account? <NavLink to="/signup"> Sign up </NavLink> </div>
      </div>

    </div>
  );
}

export default SignIn;
