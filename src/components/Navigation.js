import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '10px'
    },
    title: {
        flexGrow: 1,
        display: 'inline-block',
        fontFamiliy: 'Georgia',
        fontSize: '30px',
        paddingLeft: '10px',
    },
    navStyle: {
        paddingTop : '5px',
        display: 'inline-block',
        float: 'right',
    },
    menuStyle: {
        color: 'black',
        textDecoration: 'none',
    },
}));




function Navigation() {

    const classes = useStyles();
    const is_login = useSelector(state => state.userAction.is_login);
    const is_seller = useSelector(state => state.userAction.is_seller);
    const history = useHistory();
    const dispatch = useDispatch();
    const logout = () => {
        localStorage.clear();
        dispatch({ type: 'LOGOUT' })
        history.push('/');
        alert('로그아웃');
    }
    const loginMenu = () => {
        console.log('is_seller',is_seller);
        if (is_login) {
            if (is_seller) {
                return (
                    <>
                        <Link className={classes.menuStyle} to='/'><Button color="inherit">HOME</Button></Link>
                        <Link className={classes.menuStyle} to='/list'><Button color="inherit">LIST</Button></Link>
                        <Link className={classes.menuStyle} to='/mypage'><Button color="inherit">MYPAGE</Button></Link>
                        <Link className={classes.menuStyle} to='#'><Button onClick={logout} color="inherit">LOGOUT</Button></Link>
                    </>
                )
            } else {
                return (
                    <>
                        <Link className={classes.menuStyle} to='/'><Button color="inherit">HOME</Button></Link>
                        <Link className={classes.menuStyle} to='/enroll'><Button color="inherit">ENROLL</Button></Link>
                        <Link className={classes.menuStyle} to='/mypage'><Button color="inherit">MYPAGE</Button></Link>
                        <Link className={classes.menuStyle} to='#'><Button onClick={logout} color="inherit">LOGOUT</Button></Link>
                    </>
                )
            }
        } else {
            return (
                <>
                    <Link className={classes.menuStyle} to='/'><Button color="inherit">HOME</Button></Link>
                    <Link className={classes.menuStyle} to='/login'><Button color="inherit">LOGIN</Button></Link>
                    <Link className={classes.menuStyle} to='/join'><Button color="inherit">JOIN</Button></Link>
                </>
            )
        }
    }

    return (
        <div className={classes.root}>
            <Typography className={classes.title}>
                HELL
            </Typography>
            <div className={classes.navStyle}>
                {loginMenu()}
            </div>
            <Divider style={{marginTop : '15px'}} />
        </div>
    )
}

export default Navigation;