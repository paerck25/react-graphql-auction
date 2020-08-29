import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Divider,Typography} from '@material-ui/core';
import { GET_MY_REQUESTS } from '../../../../lib/queries';
import { useQuery } from '@apollo/client';
import MyRequests from './MyRequests';
import RequestHistory from './RequestHistory';



const Main = () => {

    const user_id = useSelector(state => state.userAction.user_id);

    const loadingStyle = {
        display: 'block',
        margin: '18% auto',
    }

    const { loading, data, error } = useQuery(GET_MY_REQUESTS, {
        variables: { author: user_id },
        fetchPolicy: 'cache-and-network',
    }
    )

    if (error) {
        alert(error);
        return (
            <CircularProgress style={loadingStyle} />
        )
    }

    if (loading) {
        return (
            <CircularProgress style={loadingStyle} />
        )
    } 
        return (
            <div style={{padding : '10px'}}>
                <Typography variant="h5" gutterBottom>나의 요청</Typography>
                <MyRequests data={data.getMyRequests}/>
                <Divider style={{ marginTop: '30px' }} />
                <br/>
                <Typography variant="h5" gutterBottom>요청 내역</Typography>
                <RequestHistory data={data.getMyRequests}/>
            </div>
        )

}


export default Main;