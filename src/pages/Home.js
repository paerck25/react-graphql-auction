import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory, Link } from 'react-router-dom';
import { Divider, Toolbar, Slide } from '@material-ui/core';
import Background from '../img/background.jpg';
import Login from './Login';
import Join from './Join';


const useStyles = makeStyles((theme) => ({
    title: {
        textDecoration: 'none',
        color: 'white',
    },
    backgroundImage: {
        backgroundImage: `url(${Background})`,
        height: '969px',
        overflow: 'hidden',
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: theme.spacing(3, 3, 3),
    },
    buttonStyle: {
        float: 'right',
        marginTop: '8px',
        marginRight: '50px',
    }
}));


const Home = () => {
    const classes = useStyles();

    const [homeChecked, setHomeChecked] = useState(true);
    const [loginChecked, setLoginChecked] = useState(false);
    const [joinChecked, setJoinChecked] = useState(false);

    const handleHome = () => {
        setJoinChecked(false);
        setLoginChecked(false);
        setHomeChecked(true);
    }

    const handleLogin = () => {
        setHomeChecked(false);
        setJoinChecked(false);
        setLoginChecked(true);
    }

    const handleJoin = () => {
        setHomeChecked(false);
        setLoginChecked(false);
        setJoinChecked(true);
    }

    return (
        <div className={classes.backgroundImage}>
            <Toolbar style={{ marginBottom: '100px', }}>
                <Button className={classes.title} onClick={handleHome}>
                    <Typography variant="h4">
                        HELL
                    </Typography>
                </Button>
            </Toolbar>
            <Slide timeout={{ enter: 400, exit: 0 }} mountOnEnter unmountOnExit direction="down" in={homeChecked}>
                <Container className={classes.containerStyle}>
                    <Typography variant="h3" align="center" gutterBottom>Welcome to the Hell</Typography>
                    <Typography variant="h5" paragraph>
                        HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloH
                        elloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHel
                        loHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloH
                        elloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHell
                        oHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHell
                        oHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHell
                        oHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                        HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                        HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHel
                        loHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                        HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                        HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHell
                        oHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleLogin}>로그인</Button>
                    <Button variant="contained" color="primary" onClick={handleJoin}>회원가입</Button>
                </Container>
            </Slide>
            <Slide timeout={{ enter: 400, exit: 0 }} mountOnEnter unmountOnExit direction="right" in={loginChecked}>
                <div><Login handleJoin={handleJoin} /></div>
            </Slide>
            <Slide timeout={{ enter: 400, exit: 0 }} mountOnEnter unmountOnExit direction="left" in={joinChecked}>
                <div><Join handleLogin={handleLogin} /></div>
            </Slide>
        </div>
    );
}

export default Home;