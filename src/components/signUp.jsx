import React, { useState } from 'react';
import { Button, PasswordInput, TextInput } from '@mantine/core';
import { useNavigate } from 'react-router';
import useStore from '../store';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setpw] = useState('');
  const [username, setuserName] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');

  const signUp = useStore(({ authSlice }) => authSlice.signUpUser);
  const navigate = useNavigate();

  const signingUp = async () => {
    await signUp({
      email,
      password,
      username,
      first_name: firstName,
      last_name: lastName,
    });
    const { authenticated } = useStore.getState().authSlice;

    console.log(authenticated);
    if (authenticated) {
      navigate('/');
    }
  };

  return (
    <div className="signUpContainer">
      <TextInput value={firstName} onChange={(e) => setfirstName(e.target.value)} label="First Name" placeholder="Enter First Name" radius="xl" />
      <TextInput value={lastName} onChange={(e) => setlastName(e.target.value)} label="Last Name" placeholder="Enter Last Name" radius="xl" />
      <TextInput value={username} onChange={(e) => setuserName(e.target.value)} label="UserName" placeholder="Enter UserName" radius="xl" />
      <TextInput value={email} onChange={(e) => setEmail(e.target.value)} label="Email" placeholder="Enter Email" radius="xl" />
      <PasswordInput value={password} onChange={(e) => setpw(e.target.value)} label="Password" placeholder="Enter Passowrd" radius="xl" />
      <Button onClick={signingUp} radius="xl" color="#41093E"> Sign Up</Button>
    </div>
  );
}

export default SignUp;
