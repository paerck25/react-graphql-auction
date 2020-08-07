import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { GET_MY_ROOM } from '../../../../lib/queries';
import { useQuery } from '@apollo/client';
import ChatBox from './ChatBox';

const Main = (props) => {


    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }

    const { loading, data, error } = useQuery(GET_MY_ROOM, {
        variables: { 
            request: props.location.state.request,
            seller : props.location.state.seller,
        },
        fetchPolicy: 'cache-and-network'
    })

    if (loading) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if(!loading){
        console.log('state',props.location.state);
        console.log('query',data);
    }

    if (error) {
        console.log(error);
        return (
            <h1>error</h1>
        )
    }

    return (
            <ChatBox userInfo={{
                room : data.getMyRoom._id,
                messages : data.getMyRoom.messages,
            }}
            />
    )
}

export default Main;