import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Card, CardActions } from '@material-ui/core';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    card: {
        margin: '50px',
    }
}));

const Select = () => {
    const classes = useStyles();


    return (
        <div>
            <Container component="main">
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        회원가입
                    </Typography>
                    <Grid container>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardActions>
                                    <Button
                                        component={Link}
                                        to={{ pathname: '/join/form', state: { is_seller: false } }}
                                        fullWidth
                                        variant="contained"
                                        color="primary" >
                                        구매자
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item xs={6}>
                            <Card className={classes.card}>
                                <CardActions>
                                    <Button
                                        component={Link}
                                        to={{ pathname: '/join/form', state: { is_seller: true } }}
                                        fullWidth
                                        variant="contained"
                                        color="primary" >
                                        판매자
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Container>
        </div>
    )
}

export default Select;