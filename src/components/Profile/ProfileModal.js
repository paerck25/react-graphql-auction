import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../../lib/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import Profile from './Profile';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));


const ProfileModal = ({ onClose, open, user_id }) => {

    const classes = useStyles();


    const [getProfile, { loading, data, called, error }] = useLazyQuery(GET_MY_PROFILE, {
        variables: {
            user: user_id
        },
        fetchPolicy: 'cache-and-network',
    })


    useEffect(() => {
        if (open) {
            getProfile();
        }
    }, [open, data])

    if (error) {
        console.log('에러에러에러에러에러', error);
    }

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    if (!called) {
        return <></>
    }

    if (called && !loading) {
        return (
            <Profile profile={data.getMyProfile} onClose={onClose} open={open} user_id={user_id} />
        )
    }


}

export default ProfileModal
