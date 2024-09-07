import React, {useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '@fluentui/react/lib/Button';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const navigate = useNavigate();

  const handleSignUp = async () => {
    navigate('/home');
  };

  const handleLogin = (token) => {
    if (token) {
      navigate('/home');
    }
  };
  return (
    <div className='h-full flex flex-col items-center justify-center'>
      <h1 >App Monitoreo TCU 629</h1>
      <div className='space-x-5 my-4'>
        <LoginForm onLogin = {handleLogin}/>
        <SignupForm onSignUp = {handleSignUp}/>
      </div>
    </div>
  );
}

export default Login;
