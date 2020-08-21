import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Input, Container, Divider, InputAdornment, OutlinedInput } from '@material-ui/core';
import ChatList from './ChatList';
import { START_CHAT, SEND_NEW_MESSAGE } from '../../../../lib/queries';
import { useSubscription, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        background: 'lightGray',
        marginBottom: '15px',
    },
    inline: {
        display: 'inline',
    },
    myChat: {
        float: 'right',
    },
    container: {
        width: '100%',
        height: '600px',
        overflowY: 'auto',
        overflowX: 'hidden',
        margin: '0px auto',
    },
    inputStyle: {
        width: '100%',
        padding: '15px 0px 15px 15px',
    }
}));



function ChatBox({ userInfo }) {

    const classes = useStyles();

    const [message, setMessage] = useState('');

    const [newMessages, setNewMessage] = useState([]);

    const { data, error } = useSubscription(START_CHAT, {
        variables: {
            room: userInfo.room
        }
    });

    const objDiv = useRef();

    const [sendNewMessage] = useMutation(SEND_NEW_MESSAGE);

    const userName = useSelector(state => state.userAction.userName);

    useEffect(() => {
        objDiv.current.scrollTop = objDiv.current.scrollHeight;
        if (data) {
            setNewMessage((newMessages) => [
                ...newMessages,
                data.newMessage,
            ]);
        }
        if (error) {
            console.log(error);
        }
    }, [data, error])

    useEffect(() => {
        objDiv.current.scrollTop = objDiv.current.scrollHeight;
    }, [newMessages])



    const lastMessageList = userInfo.messages.map((data, i) => {
        return <ChatList key={i} data={data} userName={userName} />
    })

    const newMessageList = newMessages.map((data, i) => {
        return <ChatList key={i} data={data} userName={userName} />
    })

    const onChangeMessage = (e) => {
        setMessage(e.target.value);
    }

    const onSubmitForm = (e) => {
        if (e.keyCode === 13)
            if (!e.shiftKey) {
                if (message) {
                    e.preventDefault();
                    sendNewMessage({
                        variables: {
                            input: {
                                room: userInfo.room,
                                name: userName,
                                message: message
                            }
                        }
                    })
                    setMessage('');
                } else {
                    e.preventDefault();
                    return;
                }
            }
    }

    const onClickForm = () => {
        if (message) {
            sendNewMessage({
                variables: {
                    input: {
                        room: userInfo.room,
                        name: userName,
                        message: message
                    }
                }
            })
            setMessage('');
        } else {
            return;
        }
    }

    return (
        <div className={classes.root}>
            <Container ref={objDiv} className={classes.container}>
                <List className={classes.root}>
                    {lastMessageList}
                    {newMessageList}
                </List>
            </Container>
            <form onKeyDown={onSubmitForm}>
                <OutlinedInput
                    className={classes.inputStyle}
                    va
                    rowsMax={4}
                    multiline
                    value={message}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={onClickForm}>
                                <SendIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                    onChange={onChangeMessage} />
            </form>
        </div>
    );
}

export default ChatBox;