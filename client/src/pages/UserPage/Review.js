import React, { useState,useEffect } from 'react';
import Axios from 'axios';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { Dialog } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { POST_REVIEW } from '../../lib/queries';
import { useMutation } from '@apollo/client';

const labels = {
    0.5: '별로예요',
    1: '별로예요',
    1.5: '별로예요',
    2: '그저그래요',
    2.5: '그저그래요',
    3: '괜찮아요',
    3.5: '괜찮아요',
    4: '좋아요',
    4.5: '좋아요',
    5: '최고예요',
}
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },

    }
}))

const Review = ({ seller_id, category, request_id, open, setOpen }) => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);
    const [text, setText] = useState('');
    const [rating, setRating] = useState(0);

    const userName = useSelector(state => state.userAction.userName);

    const classes = useStyles();

    const textChangeHandelr = (e) => {
        setText(e.currentTarget.value)
    }
    const ratingChangeHandler = (e) => {
        setRating(e.currentTarget.value)
        hoverCahngeHandler();
    }
    const hoverCahngeHandler = (e, newValue) => {
        setValue(newValue);
    }

    const onClose = () => {
        setOpen(false);
    }

    const [postReview, { data }] = useMutation(POST_REVIEW,
        {
            variables: {
                input : {
                    seller : seller_id,
                    request_id : request_id,
                    category : category,
                    name : userName,
                    text,
                    rating : Number(rating)
                }
            }
        });

    useEffect(() => {
        if(data){
            if(data.postReview){
                alert('작성 완료');
                setOpen(false);
            } else {
                alert('작성 실패');
            }
        }
        return () => {
            setRating(0);
            setText('');
        }
    }, [data])

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
            aria-labelledby="draggable-dialog-title"
        >
            <div
                className={classes.root}
                style={{ maxWidth: "700px", margin: "2rem auto", textAlign: "center", marginBotton: "2rem" }}
            >
                <div>
                    <label><h2><b>판매자 만족도는 어떠신가요?</b></h2></label>
                    <Rating
                        name="half-rating"
                        defaultValue={0}
                        precision={0.5}
                        size="large"
                        align="center"
                        onChange={ratingChangeHandler}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                    />
                    {value !== null && <Box ml={2}>{labels[hover !== -1 ? hover : value]}</Box>}
                </div>

                <br />
                <br />
                <hr width="700px" color="whitesmoke" />
                <br />
                <br />
                <h2><b>이용 후기는 어떠신가요?</b></h2>
                <TextareaAutosize
                    rowsMin={2}
                    placeholder="만족도에 대한 후기를 남겨주세요"
                    style={{ backgroundColor: "whitesmoke", borderColor: "lightgray" }}
                    onChange={textChangeHandelr}
                />
                <br />
                <br />
                <div>
                    <Button
                        onClick={postReview}
                        type="submit"
                        style={{ maxWidth: "100px" }}
                        variant="contained"
                        color="primary"
                    >
                        등록
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}
export default Review;