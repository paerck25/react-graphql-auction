import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from '@apollo/client';
import { GET_BIDS_IN_REQUEST, CHOICE_ONE_BID } from '../../../../lib/queries';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReceiveList from './ReceiveList';
import Progress from '../../TradeState/Progress';
import Complete from '../../TradeState/Complete';
import Canceled from '../../TradeState/Canceled';

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

    const { loading, data } = useQuery(GET_BIDS_IN_REQUEST, {
        variables: { request: requestData._id },
        fetchPolicy: 'cache-and-network',
    }
    )

    const [choiceOneBid, { data: data2 }] = useMutation(CHOICE_ONE_BID);

    useEffect(() => {
        if (data2) {
            if(data2.choiceOneBid){
                history.replace('/user/mypage');
            }
        }
    }, [data2,history])

    if (loading) {
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    if (!loading) {
        console.log(data);
    }


    const onClickChoice = (bid_id) => {
        const AreYouSure = window.confirm('본 판매자를 선택하시겠습니까?');
        if (AreYouSure) {
            choiceOneBid({
                variables: { 
                    bid: bid_id,
                    request: requestData._id,
                }
            })
        }
    }


    switch (requestData.state) {
        case '거래 진행중':
            const data1 = data.getBidsInRequest.filter((obj) => {
                return obj.state === '거래 진행중';
            })[0]
            return <Progress data={data1} requestData={requestData} />

        case '거래 완료':
            const data2 = data.getBidsInRequest.filter((obj) => {
                return obj.state === '거래 완료';
            })[0]
            return <Complete seller_id={data2.author._id} requestData={requestData}/>

        case '취소된 거래':
            return <Canceled requestData={requestData}/>

        default:
            const data3 = data.getBidsInRequest.filter((obj) => {
                return obj.state !== '입찰 취소';
            })
            return <ReceiveList onClickChoice={onClickChoice} bidData={data3} requestData={requestData} />
    }


}

export default RequestDetail;