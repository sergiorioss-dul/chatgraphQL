import { useState } from 'react';
import './App.css';
import { AuthScreen } from './pages/AuthScreen';
import { HomeScreen } from './pages/HomeScreen';

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem('jwt') ? true : false
  );
  return (
    <>
      {loggedIn ? (
        <HomeScreen {...{ setLoggedIn }} />
      ) : (
        <AuthScreen {...{ setLoggedIn }} />
      )}
    </>
  );
}

export default App;
