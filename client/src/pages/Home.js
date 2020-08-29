import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Toolbar, Slide, Dialog, Grid } from '@material-ui/core';
import Background from '../img/background3.jpg';
import Background1 from '../img/background.jpg';
import Login from './Login';
import Join from './Join';


const useStyles = makeStyles((theme) => ({
    title: {
        color: 'rgb(104,104,106)',
    },
    nav: {
        display: 'inline-block',
        float: 'right',
        color: 'rgb(104,104,106)',
    },
    backgroundImage: {
        backgroundImage: `url(${Background})`,
        height: '969px',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
    },
    backgroundOpacity: {
        backgroundColor: 'rgba( 225, 225, 225, 0.5 )',
        height: '969px',
    },
    navBar: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
    },
    divStyle: {
        color: 'white',
        // backgroundImage: `url(${Background1})`,
        padding: theme.spacing(4, 4, 4),
    },
    buttonStyle: {
        marginTop: '8px',
        marginRight: '50px',
    }
}));

const Transition1 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="right" ref={ref} {...props} />;
});

const Transition2 = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="left" ref={ref} {...props} />;
});


const Home = () => {
    const classes = useStyles();

    const [loginChecked, setLoginChecked] = useState(false);
    const [joinChecked, setJoinChecked] = useState(false);

    const handleHome = () => {
        setJoinChecked(false);
        setLoginChecked(false);
    }

    const handleLogin = () => {
        setJoinChecked(false);
        setLoginChecked(true);
    }

    const handleJoin = () => {
        setLoginChecked(false);
        setJoinChecked(true);
    }

    return (
        <div className={classes.backgroundImage}>
            <Container>
                <div className={classes.navBar}>
                    <Typography className={classes.title} onClick={handleHome} component={Button} variant="h4">
                        HELL
                    </Typography>
                    <Typography className={classes.nav} onClick={handleLogin} component={Button} variant="h6">
                        로그인
                    </Typography>
                    <Typography className={classes.nav} onClick={handleJoin} component={Button} variant="h6">
                        회원가입
                    </Typography>
                </div>
            </Container>
            <div className={classes.backgroundOpacity}>
                <Dialog open={loginChecked}
                    TransitionComponent={Transition1}
                    keepMounted
                    onClose={handleHome}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <Login handleJoin={handleJoin} />
                </Dialog>
                <Dialog open={joinChecked}
                    TransitionComponent={Transition2}
                    keepMounted
                    onClose={handleHome}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                    <Join handleLogin={handleLogin} />
                </Dialog>
            </div>
        </div>
    );
}

export default Home;