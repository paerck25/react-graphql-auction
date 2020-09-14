import React, { useEffect } from 'react';
import { CircularProgress, Backdrop, Divider, IconButton, Grid } from '@material-ui/core';
import { GET_MY_ROOM } from '../../lib/queries';
import {  useLazyQuery } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';
import ChatBox from './ChatBox';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

function PaperComponent(props) {
    return (
      <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
        <Paper {...props} />
      </Draggable>
    );
  }

const Main = ({ request, seller, open, onClose, avatarSrc }) => {

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
    }, [open,getRoom])

    if (loading) {
        return (
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }


    if (error) {
        console.log(error);
    }

    if (!called) {
        return <></>
    }

    if (called && !loading) {
        console.log('chat connect');
        return (
            <Dialog
                open={open}
                onClose={onClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move',padding: '0px' }} id="draggable-dialog-title">
                    <Grid container>
                        <Grid item xs={6}>
                            <div style={{ marginLeft: '14px', marginTop: '10px' }}>채팅</div>
                        </Grid>
                        <Grid item xs={6}>
                            <IconButton onClick={onClose} style={{ float: 'right' }}>
                                <CloseIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <Divider />
                <DialogContent style={{ backgroundColor: 'lightgray' }}>
                    <ChatBox userInfo={{
                        room: data.getMyRoom._id,
                        messages: data.getMyRoom.messages,
                    }}
                        avatarSrc={avatarSrc}
                    />
                </DialogContent>
            </Dialog>
        )
    }
}

export default Main;