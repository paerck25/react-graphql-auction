import React, { useState, useEffect } from 'react';
import { Container, Divider, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RequestCard from '../../../../components/RequestCard';
import Bids from './Bids';
import { useMutation } from '@apollo/client';
import { TRADE_CANCLE } from '../../../../lib/queries';
import { useHistory } from 'react-router-dom';
import Counter from '../../../../components/Counter';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'rgb(104,104,106)'
    },
    gridStyle: {
        margin: '4% auto',
        width: "80%",
    },
    loadingStyle: {
        display: 'block',
        margin: '4% auto',
    },
    large: {
        width: '100px',
        height: '100px',
    },
    buttonStyle: {
        width: '100%',
    },
    counterStyle: {
        textAlign: 'center',
        margin: '8px',
    },
}));

const ReceiveList = ({ requestData, bidData, onClickChoice, }) => {

    const history = useHistory();

    const classes = useStyles();

    const [tradeCancle, { data: cancle }] = useMutation(TRADE_CANCLE, {
        variables: {
            request: requestData._id,
        }
    })

    useEffect(() => {
        if (cancle) {
            alert(cancle.tradeCancle);
            history.replace('/user/mypage');
        }
    }, [cancle])

    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={6}>
                <Grid item xs={6}>
                    <RequestCard obj={requestData} />
                    <Typography variant="h6" className={classes.counterStyle}><Counter data={requestData} /></Typography>
                    <Button onClick={tradeCancle} className={classes.buttonStyle} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">받은 견적</Typography>
                    <br />
                    <Bids onClickChoice={onClickChoice} data={bidData} requestData={requestData} />
                </Grid>
            </Grid>
            <Divider/>
            <Grid container className={classes.gridStyle} spacing={9}>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>안내</Typography>
                    <ul>
                        <li>
                            본 웹사이트는 고객과 전문가를 연결시켜드리는 중개 플랫폼 입니다.
                        </li>
                        <br />
                        <li>
                            사이트 운영자는 거래에 관여하지 않습니다.
                        </li>
                        <br />
                        <li>

                        </li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>교환/환불</Typography>
                </Grid>
                <Grid item xs={4}>
                    <Typography align="center" variant="h5" gutterBottom>평점과 리뷰</Typography>
                    <ul>
                        <li>
                            평점과 리뷰는 거래 완료 고객에 한해서만 작성이 가능합니다.
                        </li>
                        <br />
                        <li>
                            사이트 운영자는 거래에 관여하지 않습니다.
                        </li>
                        <br />
                        <li>

                        </li>
                    </ul>
                </Grid>
            </Grid>
        </Container>
    )
}

// const ReceiveList = ({ requestData, bidData, onClickChoice, }) => {

//     const history = useHistory();

//     const classes = useStyles();

//     const tradeCancle = () => {
//         Axios.post('/cancle',{
//             request : requestData._id,
//         })
//         .then(res=>{
//             alert(res.data);
//             history.replace('/user/mypage');
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     return (
//         <Container>
//             <Grid className={classes.gridContainerStyle} container spacing={6}>
//                 <Grid item xs={5}>
//                     <RequestCard obj={requestData} />
//                     <Typography variant="5" style={{textAlign:'center'}}><Counter data={requestData}/></Typography variant="5">
//                     <Button onClick={tradeCancle} className={classes.buttonStyle} variant="outlined">
//                         거래 취소
//                     </Button>
//                 </Grid>
//                 <Grid item xs={7}>
//                     <Typography variant="5">받은 견적</Typography variant="5">
//                     <Bids onClickChoice={onClickChoice} data={bidData} requestData={requestData} />
//                 </Grid>
//             </Grid>
//         </Container>
//     )
// }

export default ReceiveList
