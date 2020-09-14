import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Typography,  Container } from '@material-ui/core';
import { GET_MY_BIDS } from '../../../../lib/queries';
import { useQuery } from '@apollo/client';
import Chat from '../../../../components/chat';
import BidHistory from './BidHistory';
import ChosenList from './ChoesnList';



const BidList = () => {

    const user_id = useSelector(state => state.userAction.user_id);

    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }


    const [chatOpen, setChatOpen] = useState(false);

    const [request_id, setRequest_id] = useState('');

    const handleChatClose = () => {
        setChatOpen(false);
    }

    const handleChatOpen = (request_id) => {
        setRequest_id(request_id)
        setChatOpen(true);
    }



    const { loading, data, error } = useQuery(GET_MY_BIDS, {
        variables: { author: user_id },
        fetchPolicy: 'cache-and-network',
    }
    )

    if (error) {
        console.log(error);
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if (loading && !data) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    }


    return (
        <>
            <Container>
                <Typography variant="h5" gutterBottom>진행중인 거래</Typography>
                <br/>
                <ChosenList handleChatOpen={handleChatOpen} data={data.getMyBids} />
            </Container>
            <br/><br/>
            <Container>
                <Typography variant="h5" gutterBottom>거래내역</Typography>
                <br/>
                <BidHistory data={data.getMyBids} />
            </Container>
            <Chat open={chatOpen} onClose={handleChatClose} request={request_id} seller={user_id} />
        </>

    )


}

export default BidList;