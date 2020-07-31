import React from 'react';
import Seller from './Seller';
import User from './User';
import { useSelector } from 'react-redux';

const Main = () => {
    const is_seller = useSelector(state => state.userAction.is_seller);
    return(
        <div>
            {is_seller ? <Seller/> : <User/>}
        </div>
    )
}

export default Main;