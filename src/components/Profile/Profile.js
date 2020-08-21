import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { Grid, DialogContent, DialogActions, GridList, GridListTile, TextField } from '@material-ui/core';
import ProfileCarousel from './ProfileCarousel';
import Rating from '@material-ui/lab/Rating';
import ProfileEdit from './ProfileEdit';
import PersonIcon from '@material-ui/icons/Person';
import { useSelector } from 'react-redux';

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
        color: blue[700],
    },
    buttonStyle: {
        width: '100%'
    }
}));

const Profile = ({ profile, onClose, open, user_id }) => {

    const classes = useStyles();
    const userName = useSelector(state => state.userAction.userName);
    const [imageOpen, setImageOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [image, setImage] = useState('');

    const handleClose = () => {
        onClose();
    };

    const onEditClose = () => {
        setEditOpen(false);
    }

    const onClickImageOpen = (src) => {
        setImage(src);
        setImageOpen(true);
    }


    const reviewList = profile.reviews.map((obj, index) => {
        return (
            <ListItem key={index}>
                <ListItemAvatar>
                    <Avatar className={classes.avatar}>
                        <PersonIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText>
                    {obj.name}님의 평가
                    <Rating name="half-rating-read" value={obj.rating} precision={0.5} readOnly /><br />
                    {obj.text}
                </ListItemText>
            </ListItem>
        )
    })

    return (
        <Dialog fullWidth={true} maxWidth="sm" onClose={handleClose} aria-labelledby="form-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">
                <Grid container>
                    <Grid item xs={1}>
                        {profile.profileImage !== ''
                            ?
                            <Avatar className={classes.avatar} src={profile.profileImage} />
                            :
                            <Avatar className={classes.avatar}>
                                <PersonIcon />
                            </Avatar>
                        }
                    </Grid>
                    <Grid item xs={11}>
                        <div style={{ display: "inline-block", marginTop: "5px", marginLeft: "5px" }}>
                            {profile.user.name}님의 프로필
                        </div>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <div className={classes.root}>
                    {profile.exampleImages.length !== 0
                        ?
                        <GridList className={classes.gridList} cols={2.5}>
                            {profile.exampleImages.map((obj, index) => {
                                return (
                                    <GridListTile key={index} onClick={() => { onClickImageOpen(obj) }}>
                                        <img src={obj} />
                                    </GridListTile>
                                )
                            })}
                        </GridList>
                        :
                        <h2 style={{ textAlign: 'center', marginTop: '60px' }}>No Image</h2>
                    }
                </div>
                <br />
                <h3>소개 및 설명</h3>
                {profile.text !== ''
                    ?
                    <TextField
                        multiline
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        value={profile.text}
                        style={{ width: "100%" }}
                    />
                    :
                    <TextField
                        multiline
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        value="등록된 설명이 없습니다."
                        style={{ width: "100%" }}
                    />
                }
                <h3 style={{ display: 'inline-block' }}>이용자 리뷰</h3>
                {reviewList.length !== 0
                    ?
                    <>
                        <Rating name="half-rating-read" value={1} precision={0.5} readOnly />
                        <List>
                            {reviewList}
                        </List>
                    </>
                    :
                    <h4 style={{ textAlign: 'center' }}>등록된 리뷰가 없습니다.</h4>
                }
                <ProfileCarousel open={imageOpen} setOpen={setImageOpen} src={image} />
                <ProfileEdit profile={profile} onClose={onEditClose} open={editOpen} user_id={user_id} profileClose={handleClose} />
            </DialogContent>
            {userName === profile.user.name
                ?
                <DialogActions>
                    <Button onClick={()=>{setEditOpen(true)}} variant="contained" className={classes.buttonStyle}>프로필 설정</Button>
                </DialogActions>
                :
                <>
                </>
            }
        </Dialog>
    )
}

export default Profile
