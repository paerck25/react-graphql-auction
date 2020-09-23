import React,{useState} from 'react';
import { Popover, Button, List, ListItem, ListItemText } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const SortButton = ({sort, setSort}) => {

    const [anchorEl, setAnchorEl] = useState(null);

    const [btnName, setBtnName] = useState('정렬 기준');

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const onClickSort = (value,name) => {
        if(sort[value]){
            setSort({
                [value] : sort[value] * -1
            })
        } else {
            setSort({
                [value] : 1
            })
        }
        setBtnName(name);
        setAnchorEl(null);
    }

    return (
        <>
        <Button onClick={handleClick}>
            {btnName}<ArrowDropDownIcon />
        </Button>
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List>
                <ListItem button onClick={()=>{onClickSort('deadLine',"마감임박순")}}>
                    <ListItemText primary="마감임박순" />
                </ListItem>
                <ListItem button onClick={()=>{onClickSort('requestedAt',"요청일순")}}>
                    <ListItemText primary="요청일순" />
                </ListItem>
            </List>
        </Popover>
        </>
    )
}

export default SortButton;