import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RequestMain from './Request/RequestMain';
import RequestDetail from './Request/RequestDetail';
import SellerHome from './SellerHome';
import MyPage from './MyPage';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/seller' component={SellerHome} />
            <Route exact path='/seller/request' component={RequestMain} />
            <Route path='/seller/request/:id' component={RequestDetail} />
            <Route path='/seller/mypage' component={MyPage}/>
        </Switch>
    )
}

export default Main
