import React, { useEffect } from 'react';
import { Switch, Route,BrowserRouter } from 'react-router-dom';
import  Home from './pages/Home';
import  Enroll from './pages/enroll';
import RequestMain from './pages/Request/RequestMain';
import RequestDetail from './pages/Request/RequestDetail';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Bidding from './pages/bidding';
import Login from './pages/Login';
import Join from './pages/join';
import MyPage from './pages/MyPage';
import { useDispatch } from 'react-redux';

function App() {

  const dispatch = useDispatch();

  useEffect(()=>{
    const is_login = () => {
      if(localStorage.getItem('is_login')==='true'){
        return true
      } else {
        return false
      }
    }
    const is_seller = () => {
      if(localStorage.getItem('is_seller')==='true'){
        return true
      } else {
        return false
      }
    }
    const user_id = localStorage.getItem('user_id');
    const userName = localStorage.getItem('userName');
    if(is_login()){
      console.log('자동로그인!');
      dispatch({type:'LOGIN', payload : {
        user_id : user_id,
        is_seller : is_seller(),
        userName : userName,
      }
    });
    }
  },[dispatch])
  return (
    <BrowserRouter>
      <Navigation></Navigation>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/list' component={RequestMain}  exact/>
          <Route path='/list/:id' component={RequestDetail}  exact/>
          <Route path='/list/:id/bidding' component={Bidding} exact />
          <Route path='/enroll' component={Enroll}  />
          <Route path='/login' component={Login}  />
          <Route path='/join' component={Join}  />
          <Route path='/mypage' component={MyPage}  />
        </Switch>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;