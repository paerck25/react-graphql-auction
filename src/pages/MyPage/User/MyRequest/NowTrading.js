import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { useMutation } from '@apollo/client';
import {TRADE_CANCLE,TRADE_COMPLETE} from '../../../../lib/queries';

const NowTrading = ({ data, requestData }) => {

    const history = useHistory();

    const bidOne = data.filter((obj) => {
        return obj.state === '거래 진행중';
    })

    const [tradeCancle,{data:cancle}] = useMutation(TRADE_CANCLE,{
        variables : {
            request : requestData._id,
        }
    })

    const [tradeComplete,{data:complete}] = useMutation(TRADE_COMPLETE,{
        variables : {
            bid : data._id,
            request : requestData._id,
        }
    })

    useEffect(() => {
        console.log('data',bidOne);
        if(complete){
            alert(complete.tradeComplete);
            history.replace('/mypage');
        }
        if (cancle) {
            alert(cancle.tradeCancle);
            history.replace('/mypage');
        }
    }, [complete,cancle])


    return (
        <div>
            <h1>{requestData.category}</h1>
            <h1>{requestData.detail}</h1>
            <h1>{requestData.requestedAt}</h1>
            <h1>{requestData.hopeDate}</h1>
            <h1>{bidOne[0].author.name}</h1>
            <h1>{bidOne[0].price}</h1>
            <Button component={Link} to={{ pathname: `/mypage/chat`, state: { request: requestData._id, seller: bidOne[0].author._id } }} style={{ width: '100%' }} variant="outlined">
                1:1 상담
            </Button>
            <Button onClick={tradeComplete} style={{ width: '100%' }} variant="outlined">
                거래 완료
            </Button>
            <Button onClick={tradeCancle} style={{ width: '100%' }} variant="outlined">
                거래 취소
            </Button>
        </div>
    )
}

export default NowTrading
