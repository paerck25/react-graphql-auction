import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Divider} from '@material-ui/core';
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

    const history = useHistory();

    const { loading, data, error } = useQuery(GET_MY_REQUESTS, {
        variables: { author: user_id },
        fetchPolicy: 'cache-and-network',
    }
    )

    if (error) {
        alert(error);
        history.push('/');
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
            <div>
                <h2>나의 요청</h2>
                <MyRequests data={data.getMyRequests}/>
                <Divider style={{ marginTop: '30px' }} />
                <h2>요청 내역</h2>
                <RequestHistory data={data.getMyRequests}/>
            </div>
        )

}

export default Main;