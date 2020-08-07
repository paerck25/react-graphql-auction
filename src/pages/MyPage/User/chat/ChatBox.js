import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import { Input, Container, Button } from '@material-ui/core';
import ChatList from './ChatList';
import { START_CHAT, SEND_NEW_MESSAGE } from '../../../../lib/queries';
import { useSubscription, useMutation } from '@apollo/client';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
    myChat: {
        float: 'right',
    },
    container: {
        webkitScrollbar: {
            background: 'transparent',
        },
        backgroundColor: "skyblue",
        width: '100%',
        height: '700px',
        overflowY: 'scroll',
        overflowX: 'hidden',
        margin: 'auto',
    }
}));



function ChatBox({userInfo}) {

    const classes = useStyles();

    const [message, setMessage] = useState('');

    const [newMessages, setNewMessage] = useState([]);

    const { data,error } = useSubscription(START_CHAT,{
        variables : {
            room : userInfo.room
        }
    });

    const objDiv = useRef();

    const [sendNewMessage] = useMutation(SEND_NEW_MESSAGE);

    const userName = useSelector(state => state.userAction.userName);

    useEffect(()=>{
        objDiv.current.scrollTop = objDiv.current.scrollHeight;
        if(data){
            setNewMessage((newMessages) => [
                ...newMessages,
                data.newMessage,
            ]);
        }
        if(error){
            console.log(error);
        }
    },[data,error])

    useEffect(()=>{
        objDiv.current.scrollTop = objDiv.current.scrollHeight;
    },[newMessages])



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
                        variables : {
                            input : {
                                room : userInfo.room,
                                name : userName,
                                message : message
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
                variables : {
                    input : {
                        room : userInfo.room,
                        name : userName,
                        message : message
                    }
                }
            })
            setMessage('');
        } else {
            return;
        }
    }

    return (
        <Container style={{ textAlign: 'center' }}>
            <Container ref={objDiv} className={classes.container}>
                <List className={classes.root}>
                    {lastMessageList}
                    {newMessageList}
                </List>
            </Container>
            <form onKeyDown={onSubmitForm}>
                <Input style={{ width: '90%' }} rowsMax={4} multiline value={message} onChange={onChangeMessage} />
                <Button style={{ backgroundColor: 'yellow',width: '10%' }} onClick={onClickForm}>보내기</Button>
            </form>
        </Container>
    );
}

export default ChatBox;