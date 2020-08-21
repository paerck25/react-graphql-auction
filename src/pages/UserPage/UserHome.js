import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),

    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
}));


const UserHome = () => {
    const classes = useStyles();
    const history = useHistory();

    return (
        <div className={classes.heroContent}>
            <Typography variant="h3" color="textSecondary" gutterBottom>
                Hello World!
            </Typography>
            <Typography variant="h5" color="textSecondary" paragraph>
                when you want to have own website,<br />
                here is best solution.
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => { history.push('/user/enroll') }}>
                            의뢰한다
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={() => { history.push('/enroll') }}>
                            v
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

export default UserHome;