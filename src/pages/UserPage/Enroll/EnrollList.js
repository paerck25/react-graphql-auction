import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import BuildIcon from '@material-ui/icons/Build';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import { TextField, InputAdornment, OutlinedInput, Paper } from '@material-ui/core';
import Chip from '@material-ui/core/Chip';
import LabelIcon from '@material-ui/icons/Label';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Checkbox from '@material-ui/core/Checkbox';
import RequestCard from '../../../components/RequestCard';

const useStyles = makeStyles((theme) => ({
    rootList: {
        marginTop: theme.spacing(5),
        width: '100%',
        maxWidth: 500,
        margin: 'auto',
    },
    backgroundStyle: {
        backgroundColor: 'white',
    }
}));

const categories = [
    {
        id: 0,
        value: '앱 개발'
    },
    {
        id: 1,
        value: '웹 개발'
    },
    {
        id: 2,
        value: '소프트웨어 개발'
    },
    {
        id: 3,
        value: '유지보수'
    }
];

const deadLines = [
    {
        id: 0,
        value: '1시간'
    },
    {
        id: 1,
        value: '3시간'
    },
    {
        id: 2,
        value: '6시간'
    },
    {
        id: 3,
        value: '12시간'
    },
    {
        id: 4,
        value: '18시간'
    },
    {
        id: 5,
        value: '24시간'
    }
];

function EnrollList({ stepIndex, handleEnrollData }) {

    const classes = useStyles();

    const [categoryInput, setCategoryInput] = useState({
        category: '',
        categoryIndex: null,
    });

    const { category, categoryIndex } = categoryInput;

    const [deadLineInput, setDeadLineInput] = useState({
        deadLine: '',
        deadLineIndex: null,
    });

    const { deadLine, deadLineIndex } = deadLineInput;

    const [hopeDateInput, setHopeDateInput] = useState({
        hopeDate: '',
        hopeDateIndex: null,
    });

    const { hopeDate, hopeDateIndex } = hopeDateInput;

    const onChangeTime = (index, value) => {
        const now = new Date()
        let str = value.slice(0, -2);
        let end = now.setHours(now.getHours() + Number(str));
        setDeadLineInput({
            deadLine: end,
            deadLineIndex: index,
        });
        handleEnrollData('deadLine', end)
    }

    const onChangeCategory = (index, value) => {
        setCategoryInput({
            category: value,
            categoryIndex: index
        });
        handleEnrollData('category', value)
    };

    const onChangeHopeDate = (index, value) => {
        setHopeDateInput({
            hopeDate: value,
            hopeDateIndex: index
        });
        handleEnrollData('hopeDate', value)
    };


    const [tag, setTag] = useState('');

    const [tagList, setTagList] = useState([]);

    const onChangeTag = (e) => {
        setTag(e.target.value);
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        if (tag === '') {
            return;
        } else {
            setTagList([
                ...tagList,
                tag
            ])
            handleEnrollData('tags', [
                ...tagList,
                tag
            ])
            setTag('');
        }
    }

    const onClickRemove = (index) => {
        const list = tagList.filter((obj, x) => {
            return x !== index;
        })
        setTagList(list)
    }

    const showTagList = tagList.map((obj, index) => {
        return <span key={index}><Chip label={obj} variant="outlined" size="small" onDelete={() => { onClickRemove(index) }} />&nbsp;</span>
    })

    const [detail, setDetail] = useState('');

    const onChangeDetail = (e) => {
        setDetail(e.target.value);
        handleEnrollData('detail', e.target.value);
    }


    const printList = (arr, index, fnc) => {
        return (
            <Paper elevation={3}>
                <List className={classes.backgroundStyle} component="nav" aria-label="main mailbox folders">
                    {arr.map((obj) => {
                        return (
                            <div key={obj.id}>
                                <ListItem button selected={index === obj.id} onClick={() => fnc(obj.id, obj.value)}>
                                    <ListItemIcon>
                                        <Checkbox
                                            checked={index === obj.id}
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={obj.value} />
                                </ListItem>
                            </div>
                        )
                    })}
                </List>
            </Paper>
        )
    }

    switch (stepIndex) {
        case 0:
            return (
                <div className={classes.rootList}>
                    <h1><BuildIcon /> 무엇을 만들고 싶으신가요?</h1>
                    {category}
                    <br /><br />
                    {printList(categories, categoryIndex, onChangeCategory)}
                </div>
            )
        case 1:
            return (
                <div className={classes.rootList}>
                    <h1><QueryBuilderIcon /> 경매 시간을 설정해주세요.</h1>
                    <p>
                        설정하신 시간 동안 전문가들이 입찰할 것입니다!
                    </p>
                    {deadLine === '' ? <></> : <p>경매 마감 일시: {new Date(deadLine).toLocaleString()}</p>}
                    {printList(deadLines, deadLineIndex, onChangeTime)}
                </div>
            )
        case 2:
            return (
                <div className={classes.rootList}>
                    <h1><CalendarTodayIcon /> 희망 작업 완료일을 선택해주세요.</h1>
                    {hopeDate}
                    <p>
                        전문가와 협의도 가능합니다!
                    </p>
                    <Paper elevation={3}>
                        <List className={classes.backgroundStyle} component="nav" aria-label="main mailbox folders">
                            <ListItem button selected={hopeDateIndex === 0} onClick={() => onChangeHopeDate(0, '전문가와 협의')}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={hopeDateIndex === 0}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='전문가와 협의' />
                            </ListItem>
                            <ListItem button selected={hopeDateIndex === 1} onClick={() => onChangeHopeDate(1)}>
                                <ListItemIcon>
                                    <Checkbox
                                        checked={hopeDateIndex === 1}
                                    />
                                </ListItemIcon>
                                <ListItemText primary='날짜 선택' />
                                {hopeDateIndex === 1
                                    ? <TextField
                                        id="date"
                                        label="date"
                                        type="date"
                                        defaultValue={new Date().toDateString()}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        onChange={(e) => {
                                            if (new Date(e.target.value) < new Date()) {
                                                alert('이미 지난 날짜입니다. 다시 선택해 주세요')
                                            } else {
                                                onChangeHopeDate(1, e.target.value)
                                            }
                                        }}
                                    />
                                    : <></>
                                }
                            </ListItem>
                        </List>
                    </Paper>
                </div>
            )
        case 3:
            return (
                <div className={classes.rootList}>
                    <h1><LabelIcon /> 아이디어가 있으신가요?</h1>
                    <p>
                        아이디어의 키워드를 태그형식으로 입력해주세요!<br />
                        잘 모르겠다면 입력하지 않아도 괜찮습니다.
                    </p>
                    예시 : <Chip label="쇼핑몰" variant="outlined" size="small" />&nbsp;
                    <Chip label="어플리케이션" variant="outlined" size="small" />&nbsp;
                    <Chip label="안드로이드" variant="outlined" size="small" />&nbsp;
                    <Chip label="IOS" variant="outlined" size="small" />
                    <br />
                    <br />
                    <form onSubmit={onSubmitForm}>
                        <OutlinedInput
                            fullWidth
                            style={{ backgroundColor: 'white' }}
                            size="small"
                            placeholder="한 단어씩 입력해주세요!"
                            value={tag}
                            autoFocus
                            endAdornment={<InputAdornment position="end">ENTER</InputAdornment>}
                            onChange={onChangeTag} />
                        <br /><br />
                    </form>
                    {showTagList}<br /><br />
                </div>
            )
        case 4:
            return (
                <div className={classes.rootList}>
                    <h1><AddCircleOutlineIcon /> 조금 더 자세한 설명을 적어주세요!</h1>
                    <p>
                        전문가들의 이해를 도와줄 설명이 필요해요.
                        <br />
                        잘 모르겠다면 전문가와 상담이라고 적어주세요.
                    </p>
                    <TextField id="outlined-multiline-static"
                        label="구상하신 아이디어의 상세한 설명이 필요해요!"
                        style={{ backgroundColor: 'white' }}
                        multiline
                        rows={5}
                        variant="outlined"
                        fullWidth
                        value={detail}
                        onChange={onChangeDetail}
                    />
                </div>
            )
        case 5:
            return (
                <div className={classes.rootList}>
                    <h1>작성하신 견적서를 확인해주세요!</h1>
                    <Paper elevation={3}>
                        <List>
                            {[
                                {
                                    icon: () => <BuildIcon />,
                                    text: category
                                },
                                {
                                    icon: () => <QueryBuilderIcon />,
                                    text: new Date(deadLine).toLocaleString()
                                },
                                {
                                    icon: () => <AddCircleOutlineIcon />,
                                    text: detail
                                },
                                {
                                    icon: () => <LabelIcon />,
                                    text: tagList.map((obj) => {
                                        return <span key={obj}><Chip variant="outlined" size="small" label={obj} />&nbsp;</span>
                                    })
                                },
                                {
                                    icon: () => <CalendarTodayIcon />,
                                    text: hopeDate
                                },
                            ].map((obj, index) => {
                                return (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {obj.icon()}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={obj.text}
                                        />
                                    </ListItem>
                                )
                            })}
                        </List>
                    </Paper>
                </div>

            )
        default:
            return 'Unknown stepIndex';
    }
}

export default EnrollList;