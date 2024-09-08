import { PrimaryButton } from '@fluentui/react';
import React from 'react';

const Unauthorized = () => (
  <div className='flex h-full w-full items-center justify-center flex-col space-y-4'>
    <h1 className='font-bold text-lg'>Sin Autorización</h1>
    <p>Este usuario no tiene permisos para ver esta página</p>
    <PrimaryButton href='/'>Volver al Inicio</PrimaryButton>
  </div>
);

export default Unauthorized;