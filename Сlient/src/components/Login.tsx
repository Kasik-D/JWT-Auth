import React, { FC } from 'react';
import { useAuth } from '../hooks';

export const Login: FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { login, registration } = useAuth();

  const onChangeEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const onChangePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = () => login(email, password);

  const handleRegistration = () => registration(email, password);

  return (
    <div>
      <div>
        <input
          type='text'
          placeholder='Email'
          value={email}
          onChange={onChangeEmailInput}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={onChangePasswordInput}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegistration}>Registration</button>
    </div>
  );
};
