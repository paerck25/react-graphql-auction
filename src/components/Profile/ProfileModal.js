import React, { useEffect } from 'react'
import { useLazyQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../../lib/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import Profile from './Profile';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';

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

// const ProfileModal = ({ onClose, open, user_id }) => {

//     const classes = useStyles();
//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);

//     const getMyProfile = () => {
//         Axios.get('/my-profile',{
//             user : user_id,
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
//         if (open) {
//             getMyProfile();
//         }
//     }, [open])

//     if (loading) {
//         return (
//             <Backdrop className={classes.backdrop} open={loading}>
//                 <CircularProgress color="inherit" />
//             </Backdrop>
//         )
//     }

//     if (!loading) {
//         return (
//             <Profile profile={data} onClose={onClose} open={open} user_id={user_id} />
//         )
//     }


// }


export default ProfileModal
