import React from 'react';
import { useSelector } from 'react-redux';
import RoomList from './RoomList';
import { CircularProgress } from '@material-ui/core';
import { GET_MY_ROOM_LIST_FOR_SELLER } from '../../../../lib/queries';
import { useQuery } from '@apollo/client';

const Main = () => {

    const user_id = useSelector(state => state.userAction.user_id);

    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }

    const { loading, data, error } = useQuery(GET_MY_ROOM_LIST_FOR_SELLER, {
        variables: { seller: user_id },
        fetchPolicy: 'cache-and-network'
    })

    if (loading) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if (error) {
        console.log(error);
        return (
            <h1>error</h1>
        )
    }

    return (
        <div>
            <RoomList listData={data.getMyRoomListForSeller} />
        </div>
    )
}

export default Main;