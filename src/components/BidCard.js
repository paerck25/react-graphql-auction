import React, { useState } from 'react'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';
import ProfileModal from './Profile/ProfileModal';
import UserCommuButton from './UserCommuButton';

const useStyles = makeStyles((theme) => ({
    card: {
        height: '100%',
        display: 'flex',
        textDecoration: 'none',
        maxWidth: '430px',
        maxHeight: '135px',
    },
    cardHead: {
        fontFamily: 'Montserrat, sans-serif',
        fontWeight: 'bold',
        fontSize: '20px',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    tagStyle: {
        display: 'inline-block',
        backgroundColor: '#F0F0F0',
        borderRadius: '3px',
        padding: '2px 5px',
        margin: '5px',
        fontWeight: 'bold',
    },
    large: {
        width: '100px',
        height: '100px',
    },
    scorllStyle: {
        width: '100%',
        height: '445px',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: 'auto 0px',
        padding: '0px',
    },
}));

const BidCard = ({ data, requestData, onClickChoice }) => {

    const classes = useStyles();

    const [open, setOpen] = useState(false);
    const [user_id, setUser_id] = useState('');

    const handleClickOpen = (id, name) => {
        console.log(id, name, data);
        setOpen(true);
        setUser_id(id);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const content = (function(){
        if(onClickChoice){
            return(
                <Grid container>
                    <Grid item xs={4}>
                        <Avatar onClick={() => { handleClickOpen(data.author._id, data.author.name) }} src="https://placeimg.com/100/100/animals" className={classes.large} />
                    </Grid>
                    <Grid item xs={4} style={{ margin: 'auto' }} >
                        <Typography component="legend">
                            {data.author.name}
                        </Typography>
                        <Rating name="half-rating-read" value={1} precision={0.5} readOnly />
                        <br />
                        {data.price}원
                    </Grid>
                    <Grid item xs={4} style={{ margin: 'auto' }}>
                        <UserCommuButton request_id={requestData._id} seller_id={data.author._id} />
                        <Button onClick={() => { onClickChoice(data._id) }} style={{ width: '100%' }} variant="outlined">
                            의뢰하기
                        </Button>
                    </Grid>
                </Grid>
            )
        } else {
            return(
                <Grid container>
                        <Grid item xs={6}>
                            <Avatar onClick={() => { handleClickOpen(data.author._id, data.author.name) }} src="https://placeimg.com/100/100/animals" className={classes.large} />
                        </Grid>
                        <Grid item xs={6} style={{ margin: 'auto' }} >
                            <Typography component="legend">
                                {data.author.name}
                            </Typography>
                            <Rating name="half-rating-read" value={1} precision={0.5} readOnly />
                            <br />
                            {data.price}원
                        </Grid>
                    </Grid>
            )
        }
    })();


    return (
        <Card size="large" color="primary" variant="outlined" className={classes.card}>
            <CardContent className={classes.cardContent}>
                {content}
                <ProfileModal open={open} onClose={handleClose} user_id={user_id} />
            </CardContent>
        </Card>
    )
}

export default BidCard;