import React from 'react'
import RequestCard from '../../../components/RequestCard'
import { Container, Grid, Typography,  makeStyles, Avatar, Button } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'rgb(104,104,106)'
    },
    gridStyle: {
        margin: '4% auto',
        width: "80%",
    },
    icon: {
        display: 'block',
        fontSize: 50,
        marginTop: '50px',
        margin: 'auto',
        color: "#4caf50",
    }
}));

const Complete = ({ data }) => {

    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={9}>
                <Grid item xs={6}>
                    <RequestCard obj={data.request} />
                </Grid>
                <Grid item xs={6}>
                    <CheckCircleIcon className={classes.icon} />
                    <br />
                    <Typography align="center" variant="h4" paragraph>
                        거래 완료!
                    </Typography>
                    <br />
                </Grid>
            </Grid>
        </Container>
    )
}

export default Complete
