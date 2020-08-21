import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Backdrop, Divider, IconButton, Grid } from '@material-ui/core';
import { GET_MY_ROOM } from '../../../../lib/queries';
import { useQuery, useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from './ChatBox';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Main = ({ request, seller, open, onClose }) => {

    const classes = useStyles();

    const [getRoom, { loading, data, error, called }] = useLazyQuery(GET_MY_ROOM, {
        variables: {
            request: request,
            seller: seller,
        },
        fetchPolicy: 'cache-and-network'
    })

    useEffect(() => {
        if (open) {
            getRoom();
        }
        return () => {
            console.log('disconnect');
        }
    }, [open])

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }


    if (error) {
        console.log(error);
        return (
            <h1>error</h1>
        )
    }

    if (!called) {
        return <></>
    }

    if (called && !loading) {
        console.log('chat connect');
        return (
            <Dialog onClose={onClose} open={open}>
                <DialogTitle style={{ padding:'0px' }}>
                    <Grid container>
                        <Grid item xs={6}>
                            <div style={{marginLeft:'14px',marginTop:'10px'}}>채팅</div>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton onClick={onClose} style={{ float: 'right'}}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent style={{backgroundColor:'lightgray'}}>
                    <ChatBox userInfo={{
                        room: data.getMyRoom._id,
                        messages: data.getMyRoom.messages,
                    }}
                    />
                </DialogContent>
            </Dialog>
        )
    }
}

// const Main = ({ request, seller, open, onClose }) => {

//     const classes = useStyles();

//     const [data, setData] = useState();
//     const [loading, setLoading] = useState(true);

//     const getMyRoom = () => {
//         Axios.get('/my-room',{
//             request : request,
//             seller : seller,
//         })
//         .then((res) => {
//             setData(res.data);
//             setLoading(false);
//         })
//         .catch((err) => {
//             console.log(err);
//         });
//     }

//     useEffect(() => {
//         if (open) {
//             getMyRoom();
//         }
//         return () => {
//             console.log('disconnect');
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
//             <Dialog onClose={onClose} open={open}>
//                 <DialogTitle style={{ padding:'0px' }}>
//                     <Grid container>
//                         <Grid item xs={6}>
//                             <div style={{marginLeft:'14px',marginTop:'10px'}}>채팅</div>
//                         </Grid>
//                         <Grid item xs={6}>
//                             <IconButton onClick={onClose} style={{ float: 'right'}}>
//                                 <CloseIcon />
//                             </IconButton>
//                         </Grid>
//                     </Grid>
//                 </DialogTitle>
//                 <Divider />
//                 <DialogContent style={{backgroundColor:'lightgray'}}>
//                     <ChatBox userInfo={{
//                         room: data._id,
//                         messages: data.messages,
//                     }}
//                     />
//                 </DialogContent>
//             </Dialog>
//         )
//     }
// }

export default Main;