import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Join from './pages/Join';
import Seller from './pages/SellerPage';
import User from './pages/UserPage';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

function App() {

  const dispatch = useDispatch();

  const is_login = () => {
    if (localStorage.getItem('is_login') === 'true') {
      return true
    } else {
      return false
    }
  }
  const is_seller = () => {
    if (localStorage.getItem('is_seller') === 'true') {
      return true
    } else {
      return false
    }
  }
  const user_id = localStorage.getItem('user_id');

  const userName = localStorage.getItem('userName');

  useEffect(() => {
    if (is_login()) {
      dispatch({
        type: 'LOGIN', payload: {
          user_id: user_id,
          is_seller: is_seller(),
          userName: userName,
        }
      });
    }
  }, [dispatch])

  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
      <PrivateRoute path='/seller' component={Seller}/>
      <PrivateRoute path='/user' component={User}/>
    </BrowserRouter>
  );
}

export default App;