import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_BIDS_IN_REQUEST, CHOICE_ONE_BID } from '../../../../lib/queries';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import NowTrading from './NowTrading';
import ReceiveList from './ReceiveList';
import Axios from 'axios';
import RequestCard from '../../../../components/RequestCard';
import { Container } from '@material-ui/core';
import TradeCompelete from './TradeCompelete';
import CanceledTrade from './CanceledTrade';

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
            history.replace('/user/mypage');
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


    const onClickChoice = (bid_id) => {
        choiceOneBid({
            variables: { 
                bid: bid_id,
                request: requestData._id,
            }
        })
    }


    switch (requestData.state) {
        case '거래 진행중':
            const data1 = data.getBidsInRequest.filter((obj) => {
                return obj.state === '거래 진행중';
            })[0]
            return <NowTrading data={data1} requestData={requestData} />

        case '거래 완료':
            const data2 = data.getBidsInRequest.filter((obj) => {
                return obj.state === '거래 완료';
            })[0]
            return <TradeCompelete data={data2} requestData={requestData}/>
        case '취소된 거래':
            return <CanceledTrade requestData={requestData}/>

        default:
            return <ReceiveList onClickChoice={onClickChoice} bidData={data.getBidsInRequest} requestData={requestData} />
    }


}

// const RequestDetail = (props) => {

//     const classes = useStyles();
//     const [requestData] = useState(props.location.state);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getBidsInRequest = () => {
//         Axios.get('/bid-in-request',{
//             request : requestData._id
//         })
//         .then(res=>{
//             setData(res.data);
//             setLoading(true);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     useEffect(()=>{
//         getBidsInRequest();
//     },[])

//     const choiceOneBid = (bid_id) => {
//         Axios.post('/one-bid',{
//             bid: bid_id,
//             request : requestData._id,
//         })
//         .then(res=>{
//             alert(res.data)
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }


//     if (loading) {
//         return (
//             <CircularProgress className={classes.loadingStyle} />
//         )
//     }

//     if (!loading) {
//         console.log(data);
//     }

//     switch (requestData.state) {
//         case '거래 진행중':
//             return <NowTrading data={data} requestData={requestData} />
//         case '거래 완료':
//             return <h1>거래 완료</h1>
//         case '취소된 거래':
//             return <h1>취소된 거래</h1>
//         case '취소된 요청':
//             return <h1>취소된 요청(요청시간이 마감되었는데 견적서가 1개도 없음)</h1>

//         default:
//             return <ReceiveList onClickChoice={choiceOneBid} bidData={data} requestData={requestData} />
//     }


// }

export default RequestDetail;