import React, { useState } from 'react';
import Request from './Request';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_ALL_REQUESTS } from '../../../lib/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import SortButton from './SortButton';
import { useHistory } from 'react-router-dom';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingBottom: theme.spacing(4),
        margin: 'auto',
    },
    loadingStyle: {
        display: 'block',
        margin: '10% auto',
    },
}));


const RequestList = ({ category }) => {
    const classes = useStyles();
    const history = useHistory();

    const { loading, data, error } = useQuery(GET_ALL_REQUESTS, {
        fetchPolicy: 'cache-and-network',
    });


    const [listSort, { loading: ld, data: dt, error: er }] = useLazyQuery()



    if (loading) {
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }

    if (!loading) {
        console.log(data);
    }


    if (error) {
        alert(error);
        history.push('/');
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }


    const requestList = data.getAllRequests
        .map((obj) => {
            return (
                <Grid key={obj._id} item xs={12}>
                    <Request data={obj} checked={loading}></Request>
                </Grid>
            )
        })


    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h5" style={{ display: 'inline-block', margin: '0px' }}>{category}</Typography>
            <SortButton category={category} />
            <Grid container spacing={3}>
                {requestList}
            </Grid>
        </Container>
    )


}

// const RequestList = ({ category }) => {

//     const classes = useStyles();
//     const [data, setData] = useState([])
//     const [loading, setLoading] = useState(true);

//     const getAllRequests = () =>{
//         axios.get('/all-request')
//         .then(res=>{
//             setData(res.data);
//             setLoading(false);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     useEffect(() => {
//         getAllRequests();
//     }, [])



//     if (loading) {
//         return (
//             <CircularProgress className={classes.loadingStyle} />
//         )
//     }

//     if (!loading) {
//         console.log(data);
//     }


//     const requestList = data
//         .map((obj) => {
//             return (
//                 <Grid key={obj._id} item xs={12}>
//                     <Request data={obj}></Request>
//                 </Grid>
//             )
//         })


//     return (
//         <Container className={classes.cardGrid} maxWidth="md">
//             <h2 style={{ display: 'inline-block', margin: '0px' }}>{category}</h2>
//             <SortButton category={category} />
//             <Grid container spacing={3}>
//                 {requestList}
//             </Grid>
//         </Container>
//     )


// }


export default RequestList;