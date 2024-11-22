import React, { useState } from 'react';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import useStore from '../store';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setpw] = useState('');
  const [username, setuserName] = useState('');

  const signUp = useStore(({ authSlice }) => authSlice.signUpUser);
  const navigate = useNavigate();

  const signingUp = async () => {
    await signUp({
      email,
      password,
      username,
    });
    const { authenticated } = useStore.getState().authSlice;

    console.log(authenticated);
    if (authenticated) {
      navigate('/');
    }
  };

  return (
    <div className="signUpContainer">
      <TextInput value={username} onChange={(e) => setuserName(e.target.value)} label="UserName" placeholder="Enter UserName" radius="xl" />
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" radius="xl" />
      <PasswordInput value={password} onChange={(e) => setpw(e.target.value)} label="Password" placeholder="Enter Passowrd" radius="xl" />
      <Button onClick={signingUp} radius="xl" color="#41093E"> Sign Up</Button>
    </div>
  );
}

export default SignUp;
