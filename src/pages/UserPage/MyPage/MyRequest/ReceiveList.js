import React, { useState,useEffect } from 'react';
import { Container, Divider,Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RequestCard from '../../../../components/RequestCard';
import Bids from './Bids';
import { useMutation } from '@apollo/client';
import {TRADE_CANCLE,TRADE_COMPLETE} from '../../../../lib/queries';
import { useHistory } from 'react-router-dom';
import Counter from '../../../../components/Counter';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    gridContainerStyle: {
        margin: '4% auto',
        width: "80%",
    },
    loadingStyle: {
        display: 'block',
        margin: '4% auto',
    },
    buttonStyle : {
        width : '100%',
    }
}));

const ReceiveList = ({ requestData, bidData, onClickChoice, }) => {

    const history = useHistory();

    const classes = useStyles();
    
    const [tradeCancle,{data:cancle}] = useMutation(TRADE_CANCLE,{
        variables : {
            request : requestData._id,
        }
    })

    useEffect(() => {
        if (cancle) {
            alert(cancle.tradeCancle);
            history.replace('/user/mypage');
        }
    }, [cancle])

    return (
        <Container>
            <Grid className={classes.gridContainerStyle} container spacing={6}>
                <Grid item xs={5}>
                    <RequestCard obj={requestData} />
                    <h2 style={{textAlign:'center'}}><Counter data={requestData}/></h2>
                    <Button onClick={tradeCancle} className={classes.buttonStyle} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
                <Grid item xs={7}>
                    <h2>받은 견적</h2>
                    <Bids onClickChoice={onClickChoice} data={bidData} requestData={requestData} />
                </Grid>
            </Grid>
        </Container>
    )
}

export default ReceiveList
