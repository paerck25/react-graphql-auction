import React, { useEffect } from 'react';
import { Container, Divider, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import RequestCard from '../../../../components/RequestCard';
import Bids from './Bids';
import { useMutation } from '@apollo/client';
import { TRADE_CANCEL } from '../../../../lib/queries';
import { useHistory } from 'react-router-dom';
import Counter from '../../../../components/Counter';
import Notice from '../../../../components/Notice';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        color: 'rgb(104,104,106)'
    },
    gridStyle: {
        margin: '4% auto',
        width: "90%",
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

    const [tradeCancel, { data: cancel }] = useMutation(TRADE_CANCEL, {
        variables: {
            request: requestData._id,
        }
    })

    useEffect(() => {
        if (cancel) {
            alert(cancel.tradeCancel);
            history.replace('/user/mypage');
        }
    }, [cancel,history])

    return (
        <Container className={classes.root}>
            <Grid className={classes.gridStyle} container spacing={6}>
                <Grid item xs={6}>
                    <RequestCard obj={requestData} />
                    <Typography variant="h6" className={classes.counterStyle}><Counter data={requestData} /></Typography>
                    <Button onClick={tradeCancel} className={classes.buttonStyle} variant="outlined">
                        거래 취소
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h5">받은 견적</Typography>
                    <br />
                    <Bids onClickChoice={onClickChoice} data={bidData} requestData={requestData} />
                </Grid>
            </Grid>
            <Notice/>
        </Container>
    )
}

// const ReceiveList = ({ requestData, bidData, onClickChoice, }) => {

//     const history = useHistory();

//     const classes = useStyles();

//     const tradeCancel = () => {
//         Axios.post('/cancel',{
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
//                     <Button onClick={tradeCancel} className={classes.buttonStyle} variant="outlined">
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
