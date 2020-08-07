import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_BIDS_IN_REQUEST, CHOICE_ONE_BID } from '../../../../lib/queries';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Bids from './Bids';
import NowTrading from './NowTrading';

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
    loadingStyle: {
        display: 'block',
        margin: '18% auto',
    },
    large: {
        width: '100px',
        height: '100px',
    },
}));

const RequestDetail = (props) => {

    const classes = useStyles();

    const history = useHistory();

    const [requestData] = useState(props.location.state);

    const { loading, data, error } = useQuery(GET_BIDS_IN_REQUEST, {
        variables: { request: requestData._id },
        fetchPolicy: 'cache-and-network',
    }
    )

    const [choiceOneBid, { data: data2 }] = useMutation(CHOICE_ONE_BID);

    useEffect(() => {
        if (data2) {
            alert(data2.choiceOneBid);
            history.replace('/mypage');
        }
    }, [data2])

    if (loading) {
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    if (!loading) {
        console.log(data);
    }

    if (error) {
        alert(error);
        history.push('/');
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    const onClickChoice = (bid_id) => {
        choiceOneBid({
            variables: {
                bid: bid_id,
                request: requestData._id,
            }
        })
    }


    if (requestData.state === '요청 진행중') {
        return (
            <div>
                <h2>받은 견적서</h2>
                <Grid container>
                    <Grid item xs={6}>
                        {requestData.category}
                        <br />
                        {requestData.tags.map((obj) => {
                            return obj;
                        })}
                        <br />
                        {requestData.detail}
                        <br />
                        {requestData.hopeDate}
                        <br />
                        {requestData.requestdAt}
                    </Grid>
                    <Grid item xs={6}>
                        <Bids onClickChoice={onClickChoice} data={data.getBidsInRequest} requestData={requestData}/>
                    </Grid>
                </Grid>
            </div>
        )
    } else if(requestData.state === '거래 진행중') {
        return(
            <NowTrading data={data.getBidsInRequest} requestData={requestData}/>
        )
    } else if(requestData.state === '거래 종료'){
        return(
            <h1>거래 종료</h1>
        )
    }


}

export default RequestDetail;