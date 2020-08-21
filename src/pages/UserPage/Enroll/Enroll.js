import React, { useEffect } from 'react';
import Stepper from './EnrollStepper';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
        color : 'rgb(104,104,106)',
    },
}));

function Enroll(){

    // const is_login = useSelector(state => state.userAction.is_login);
    const is_login = localStorage.getItem('is_login');
    const history = useHistory();
    const classes = useStyles();

    useEffect(()=>{
        if(!is_login){
            alert('로그인이 필요합니다.');
            history.push('/login');
        }
    },[is_login,history])

    return(
        <Container className={classes.heroContent}>
            <Stepper/>
        </Container>
    )
}

export default Enroll;
