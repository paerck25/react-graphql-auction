import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

// const Main = () => {

//     const user_id = useSelector(state => state.userAction.user_id);

//     const loadingStyle = {
//         display: 'block',
//         margin: '18% auto',
//     }

//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);

//     const getMyRequests = () => {
//         axios.get('/my-request',{
//             author: user_id
//         })
//         .then(res=>{
//             setData(res.data);
//             setLoading(false);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     useEffect(() => {
//         getMyRequests();
//     }, [])

//     if (loading) {
//         return (
//             <CircularProgress style={loadingStyle} />
//         )
//     } 
//         return (
//             <div>
//                 <h2>나의 요청</h2>
//                 <MyRequests data={data}/>
//                 <Divider style={{ marginTop: '30px' }} />
//                 <h2>요청 내역</h2>
//                 <RequestHistory data={data}/>
//             </div>
//         )

// }

export default Main;