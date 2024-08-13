import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     setSession(session);
  //   });

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, [session]);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Error signing up:', error);
    } else {
      console.log('Check your email for the confirmation link.');
    }
  };

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('Error logging in:', error);
    } else {
      navigate('/tablestest');
    }
  };

  return (
    <div>
      <h1 className=''>Supabase + Vite + React</h1>
      <div >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleLogin}>Log In</button>
      </div>
    </div>
  );
}

export default App;
