import React from 'react';
import './App.css';
import { Login } from './components/Login';
import { useAuth } from './hooks';

function App() {
  const { isAuth, userData, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className='App'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='App'>
      <h1>
        {isAuth
          ? `User authorized ${userData.email}`
          : userData.isActivated
          ? 'confirm Email'
          : 'Authorize'}
      </h1>
      {!isAuth ? <Login /> : <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default App;
