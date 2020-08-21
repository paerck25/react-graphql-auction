import React, { useEffect } from 'react';
import Stepper from './EnrollStepper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Enroll(){

    // const is_login = useSelector(state => state.userAction.is_login);
    const is_login = localStorage.getItem('is_login');
    const history = useHistory();

    useEffect(()=>{
        if(!is_login){
            alert('로그인이 필요합니다.');
            history.push('/login');
        }
    },[is_login,history])

    return(
        <div>
            <Stepper/>
        </div>
    )
}

export default Enroll;
