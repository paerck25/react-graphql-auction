import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 500,
        margin: 'auto',
    },
    list: {
        margin: '5px',
        borderRadius: '5px'
    }
}));


const RoomList = ({ listData }) => {
    const classes = useStyles();


    const showRoomList = listData.map((obj) => {
        return (
            <ListItem
                button
                className={classes.list}
                component={Link}
                to={{ pathname: `/seller/mypage/chat/${obj._id}`, state: { room: obj._id, messages: obj.messages } }}
                key={obj._id}
            >
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={obj.request.author.name} secondary={obj.request.category} />
            </ListItem>
        )
    })

    return (
        <List className={classes.root}>
            {showRoomList}
        </List>

    )
}

export default RoomList;