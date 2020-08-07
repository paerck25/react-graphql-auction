import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';



const myTextStyle = {
    display: 'inline-block',
    border: "1px solid yellow",
    borderRadius: '5px',
    padding: "2px 10px",
    backgroundColor: 'yellow',
    color: 'black',
    fontSize: '15px',
    maxWidth: '300px',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
}


const otherTextStyle = {
    display: 'inline-block',
    border: "1px solid white",
    borderRadius: '5px',
    padding: "2px 10px",
    backgroundColor: 'white',
    color: 'black',
    fontSize: '15px',
    maxWidth: '300px',
    whiteSpace: 'pre-line',
    wordBreak: 'break-all',
}

const systemStyle = {
    textAlign: "center",
    margin: "15px 20px",
}



function ChatList({ data, userName }) {

    return (
        <>
            {(data.name === 'system') ?
                <>
                    <div style={systemStyle}>
                        {data.message}
                    </div>
                </> :
                (data.name === userName) ?
                    <>
                        <ListItem alignItems="flex-start" style={{ textAlign: 'right', paddingRight: '0px' }}>
                            <ListItemText
                                primary={<small>{data.name}</small>}
                                secondary={
                                    <React.Fragment>
                                        <small>{data.createdAt}</small>
                                &nbsp;&nbsp;
                                <span style={myTextStyle}>
                                            {data.message}
                                        </span>
                                    </React.Fragment>
                                }
                            />
                            <ListItemAvatar>
                                <Avatar style={{ marginLeft: '14px' }} alt="Remy Sharp" src="https://placeimg.com/200/100/any" />
                            </ListItemAvatar>
                        </ListItem>
                    </> :
                    <>
                        <ListItem alignItems="flex-start" style={{ paddingLeft: '0px' }}>
                            <ListItemAvatar >
                                <Avatar alt="Remy Sharp" src="https://placeimg.com/200/100/any" />
                            </ListItemAvatar>
                            <ListItemText
                                primary={<small>{data.name}</small>}
                                secondary={
                                    <React.Fragment>
                                        <span style={otherTextStyle}>
                                            {data.message}
                                        </span>
                            &nbsp;&nbsp;
                            <small>{data.createdAt}</small>
                                    </React.Fragment>
                                }
                            />
                        </ListItem>
                    </>
            }
        </>
    )
}

export default ChatList;