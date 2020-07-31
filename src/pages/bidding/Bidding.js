import React, { useState,useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import { SEND_BID } from '../../lib/queries';

function Bidding({ open, setOpen, data }) {

    const [price, setPrice] = useState(0);

    const user_id = useSelector(state => state.userAction.user_id);

    const userName = useSelector(state => state.userAction.userName);

    const [sendBid, {data : data_result}] = useMutation(SEND_BID);

    useEffect(() => {
        if(data_result){
            alert(data_result.sendBid)
            setOpen(false);
        }
    }, [data_result,setOpen])


    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        sendBid({
            variables: {
                input: {
                    request: data._id,
                    author: user_id,
                    name: userName,
                    price: price,

                }
            }
        })
    }
    
    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">입찰하기</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        입력하신 가격과 함께 프로필이 구매자에게 전달됩니다.
                    </DialogContentText>
                    <form onSubmit={onSubmitForm}>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="price"
                            label="총 금액"
                            type="number"
                            fullWidth
                            onChange={onChangePrice}
                        />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onSubmitForm} color="primary">
                        입찰
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        취소
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Bidding;