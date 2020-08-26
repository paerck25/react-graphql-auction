import React from 'react'
import RequestCard from '../../../../components/RequestCard'
import { Container, Grid, Typography, Divider, makeStyles, Avatar } from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';
import PersonIcon from '@material-ui/icons/Person';
import CancelIcon from '@material-ui/icons/Cancel';

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
        marginTop : '80px',
        margin: 'auto',
    }
}));

const CanceledTrade = ({ data, requestData }) => {
    const classes = useStyles();
    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={7}>
                <Grid item xs={6}>
                    <RequestCard obj={requestData} />
                </Grid>
                <Grid item xs={6}>
                    <br />
                    <CancelIcon className={classes.icon} color="error" />
                    <br />
                    <Typography align="center" variant="h5" paragraph>
                        취소되었습니다.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}

export default CanceledTrade;