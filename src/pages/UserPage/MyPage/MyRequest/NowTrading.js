import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button, Container, Grid } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import { TRADE_CANCLE, TRADE_COMPLETE } from '../../../../lib/queries';
import UserCommuButton from '../../../../components/UserCommuButton';
import RequestCard from '../../../../components/RequestCard';
import { makeStyles } from '@material-ui/core/styles';
import BidCard from '../../../../components/BidCard';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridStyle: {
        margin: '4% auto',
        width: "80%",
    },
    loadingStyle: {
        display: 'block',
        margin: '4% auto',
    },
}));

const NowTrading = ({ data, requestData }) => {

    const classes = useStyles();

    const history = useHistory();

    const bidOne = data.filter((obj) => {
        return obj.state === '거래 진행중';
    })

    const [tradeCancle, { data: cancle }] = useMutation(TRADE_CANCLE, {
        variables: {
            request: requestData._id,
        }
    })

    const [tradeComplete, { data: complete }] = useMutation(TRADE_COMPLETE, {
        variables: {
            bid: bidOne[0]._id,
            request: requestData._id,
        }
    })

    useEffect(() => {
        console.log('data', data);
        if (complete) {
            alert(complete.tradeComplete);
            history.replace('/user/mypage');
        }
        if (cancle) {
            alert(cancle.tradeCancle);
            history.replace('/user/mypage');
        }
    }, [complete, cancle])



    return (
        <Container>
            <Grid className={classes.gridStyle} container spacing={9}>
                <Grid item xs={6}>
                    <RequestCard obj={requestData} />
                </Grid>
                <Grid item xs={6}>
                    <h2>판매자</h2>
                    <BidCard data={bidOne[0]} requestData={requestData}/>
                    <UserCommuButton request_id={requestData._id} seller_id={bidOne[0].author._id} phone={bidOne[0].author.profile.phone} />
                    <Button onClick={tradeComplete} style={{ width: '100%' }} variant="outlined">
                        거래 완료
                    </Button>
                    <Button onClick={tradeCancle} style={{ width: '100%' }} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
            </Grid>

        </Container>
    )
}

export default NowTrading
