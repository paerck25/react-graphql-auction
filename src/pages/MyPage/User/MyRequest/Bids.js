import React from 'react'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import Avatar from '@material-ui/core/Avatar';

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
}));

const Bids = ({data,requestData,onClickChoice}) => {

    const classes = useStyles();

    const bids = data.map((obj) => {
        return (
            <Card key={obj._id} size="large" color="primary" variant="outlined" className={classes.card}>
                <CardContent className={classes.cardContent}>
                    <Grid container>
                        <Grid item xs={4}>
                            <Avatar src="https://placeimg.com/100/100/animals" className={classes.large} />
                        </Grid>
                        <Grid item xs={4} style={{ margin: 'auto' }} >
                            <Typography component="legend">
                                {obj.author.name}
                            </Typography>
                            <Rating name="half-rating-read" value={1} precision={0.5} readOnly />
                            <br />
                            {obj.price}원
                            </Grid>
                        <Grid item xs={4} style={{ margin: 'auto' }}>
                            <Button component={Link} to={{ pathname: `/mypage/chat`, state: { request: requestData._id, seller: obj.author._id } }} style={{ width: '100%' }} variant="outlined">
                                1:1 상담
                            </Button>
                            <Button onClick={() => { onClickChoice(obj._id) }} style={{ width: '100%' }} variant="outlined">
                                의뢰하기
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        )
    })

    return (
        <>
            {bids}
        </>
    )
}

export default Bids;
