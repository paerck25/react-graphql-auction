import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Grid, DialogContent, DialogActions, GridList, GridListTile, TextField } from '@material-ui/core';
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../../lib/queries';
import Modal from '@material-ui/core/Modal';
import ProfileCarousel from './ProfileCarousel';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
  }));


const ProfileModal = ({ onClose, open, user_id }) => {

    const classes = useStyles();

    const [imageOpen, setImageOpen] = useState(false);
    const [image, setImage] = useState('');

    const [text,setText] = useState('내용없음');

    const { loading, data, error } = useQuery(GET_MY_PROFILE, {
        variables: {
            user: user_id
        }
    })

    const handleClose = () => {
        onClose();
    };

    const onClickImageOpen = (src) => {
        setImage(src);
        setImageOpen(true);
    }


    if (loading) {
        return (
            <>
            </>
        )
    }

    if (!loading) {
        console.log(data);
    }


    return (
        <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">
                <Grid container>
                    <Grid item xs={1}>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ display: "inline-block", marginTop: "5px", marginLeft: "5px" }}>김동제님의 프로필</div>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    <GridList className={classes.gridList} cols={2.5}>
                            <GridListTile button onClick={()=>{onClickImageOpen("https://placeimg.com/300/200/animals")}}>
                                <img src="https://placeimg.com/300/200/animals" />
                            </GridListTile>
                    </GridList>
                </div>
                <br/>
                <h3>상세설명</h3>
                <TextField 
                multiline 
                variant="outlined" 
                InputProps={{ readOnly: true }} 
                value={text}
                style={{width : "100%"}}
                />
                <ProfileCarousel open={imageOpen} setOpen={setImageOpen} src={image} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setImageOpen(true)}>Open carousel</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ProfileModal
