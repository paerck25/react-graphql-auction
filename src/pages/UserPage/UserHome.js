import React,{useEffect,useState} from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { Divider, Paper } from '@material-ui/core';
import Background from '../../img/background3.jpg'
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Zoom from '@material-ui/core/Zoom';
import ExpertRegister from '../ExpertRegister/ExpertRegister';


const useStyles = makeStyles((theme) => ({
    divStyle: {
        backgroundImage: `url(${Background})`,
        height: '400px',
    },
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    containerStyle: {
        backgroundColor: 'white',
        padding: theme.spacing(3, 3, 3),
        margin: '100px auto'
    },
    buttonStyle: {
        float: 'right',
        marginTop: '8px',
        marginRight: '50px',
    },
    linkStyle: {
        color: 'rgb(104,104,106)',
        float : 'right',
    }

}));

const UserHome = () => {
    const classes = useStyles();
    const history = useHistory();
    const [checked, setChecked] = useState(false);
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false);
    }

    const user_id = localStorage.getItem('user_id');

    useEffect(() => {
        setChecked(true);
        return () => {
            setChecked(false);
        }
    }, [])

    return (
        <>
            <div className={classes.divStyle}>
                <Container>
                    <Grid container className={classes.heroContent}>
                        <Grid item xs={8}>
                            <Typography variant="h4" color="textSecondary" gutterBottom>
                                Try it!
                        </Typography>
                            <Typography variant="h3" color="textSecondary" paragraph>
                                When you want to have own website,<br />
                                Here is best solution.
                        </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            <Container>
                <Grid container spacing={9}>
                    <Grid item xs={6}>
                    <Zoom in={checked} timeout={250}>
                        <Paper className={classes.containerStyle} elevation={3}>
                            <Typography variant="h5" color="textSecondary" gutterBottom>
                                is Guest?
                            </Typography>
                            <Typography variant="h6" color="textSecondary" paragraph>
                                when you want to have own website,<br />
                                here is best solution.
                                <Button component={Link} className={classes.linkStyle} to="/user/enroll">
                                    REQUEST ENROLL<ArrowForwardIcon fontSize="small" />
                                </Button>
                            </Typography>
                        </Paper>
                    </Zoom>
                    </Grid>
                    <Grid item xs={6}>
                        <Zoom in={checked} timeout={500}>
                            <Paper className={classes.containerStyle} elevation={3}>
                                <Typography variant="h5" color="textSecondary" gutterBottom>
                                    is Expert?
                                </Typography>
                                <Typography variant="h6" color="textSecondary" paragraph>
                                    when you want to have own website,<br/>
                                    here is best solution.
                                    <Button onClick={()=>{setOpen(true)}} className={classes.linkStyle}>
                                        EXPERT Register<ArrowForwardIcon fontSize="small" />
                                    </Button>
                                </Typography>
                            </Paper>
                        </Zoom>
                    </Grid>
                </Grid>
            </Container>
            <ExpertRegister onClose={onClose} open={open} user_id={user_id}/>
        </>
    );
}

export default UserHome;