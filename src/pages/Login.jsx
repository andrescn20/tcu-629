import React, {useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [login, setLogin] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLogin(true);
  };

  const handleLogin = (token) => {
    if (token) {
      navigate('/');
    }
  };
  return (
    <div className='flex flex-col m-12'>
      <div>
        <h1 className='text-2xl'>TCU 629</h1>
        <h1 className='text-xl'>Aplicación Monitoreo</h1>
      </div>
      <div className='grow my-12 w-full flex flex-col items-center justify-center'>
        <div className='space-x-5 my-4 w-1/3'>
          {login && <LoginForm onLogin = {handleLogin}/>}
          {!login && <SignupForm onSignUp = {handleSignUp}/>}
        </div>
        <DefaultButton text={login ? "Usuario Nuevo" : "Usuario Registrado"} onClick={() => setLogin(!login)} />
      </div>
    </div>
  );
}

export default Login;
