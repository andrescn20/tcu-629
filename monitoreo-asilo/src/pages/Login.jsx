import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
  const navigate = useNavigate();

  const {isAuthenticated} = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tablestest');
    }
  }, []);

  const handleSignUp = async () => {
    navigate('/tablestest');
  };

  const handleLogin = async () => {
      navigate('/tablestest');
  };

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h1 >App Monitoreo TCU 629</h1>
      <div className='space-x-5 my-4'>
        <LoginButton />
      </div>
    </div>
  );
}

export default Login;
