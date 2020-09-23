import React, { useState, useEffect } from 'react';
import Request from './Request';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { GET_ALL_REQUESTS } from '../../../lib/queries';
import { useQuery } from '@apollo/client';
import SortButton from './SortButton';
import { Typography } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    loadingStyle: {
        display: 'block',
        margin: '10% auto',
    },
    pagination: {
        marginTop: '30px',
    }

}));


const RequestList = ({ category, page, setPage, sort,tags,setTags }) => {
    const classes = useStyles();

    const handleChangePage = (event, value) => {
        setPage(value);
    };


    const { loading, data, error } = useQuery(GET_ALL_REQUESTS, {
        variables: {
            category,
            page,
            tags,
            sort,
        },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        setTags([]);
    }, [category])


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
        return (
            <CircularProgress className={classes.loadingStyle} />
        )
    }


    const requestList = data.getAllRequests.requests
        .map((obj) => {
            return (
                <Grid key={obj._id} item xs={12} sm={12} md={6}>
                    <Request tags={tags} setTags={setTags} data={obj} checked={loading}></Request>
                </Grid>
            )
        })


    return (
        <>
            {data.getAllRequests.count !== 0
                ?
                <>
                    <Grid container spacing={3}>
                        {requestList}
                    </Grid>
                    <Pagination className={classes.pagination} count={data.getAllRequests.count} page={page} onChange={handleChangePage} defaultPage={1} />
                </>
                :
                <Typography variant="h5" style={{ marginTop: '40px' }}>진행중인 요청이 없습니다.</Typography>
            }
        </>
    )


}


export default RequestList;