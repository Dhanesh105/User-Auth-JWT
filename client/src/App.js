import React, { useState, createContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Nav from './Nav';
import Register from './Register';
import Login from './Login';
import Myprofile from './Myprofile';
import Home from './Home';
import './App.css';

export const store = createContext();

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  // Check for token in localStorage on app startup
  useEffect(() => {
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('authUser');

    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('authUser');
      }
    }
  }, []);

  // Enhanced token setter that also handles localStorage
  const setTokenWithStorage = (newToken, userData = null) => {
    if (newToken) {
      localStorage.setItem('authToken', newToken);
      if (userData) {
        localStorage.setItem('authUser', JSON.stringify(userData));
        setUser(userData);
      }
    } else {
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setUser(null);
    }
    setToken(newToken);
  };

  return (
    <div className="App">
      <store.Provider value={[token, setTokenWithStorage, user, setUser]}>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/myprofile' component={Myprofile} />
          </Switch>
        </BrowserRouter>
      </store.Provider>
    </div>
  )
}

export default App
