import React, { useEffect } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Login from './pages/Login';
import Join from './pages/Join';
import Seller from './pages/SellerPage';
import User from './pages/UserPage';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';

// const Seller = React.lazy(() => import('./pages/SellerPage'));
// const User = React.lazy(() => import('./pages/UserPage'));

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
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
    if (is_login()) {
      console.log('자동로그인!');
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
    <div style={{ backgroundColor: '#f9f9f9' }}>
    <Navigation></Navigation>
    </div>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/seller' component={Seller} />
          <Route path='/user' component={User} />
          <Route path='/login' component={Login} />
          <Route path='/join' component={Join} />
        </Switch>
      <div style={{ backgroundColor: '#f9f9f9' }}>
        <Footer></Footer>
      </div>
    </BrowserRouter>
  );
}

export default App;