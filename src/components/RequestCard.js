import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import BuildIcon from '@material-ui/icons/Build';
import Chip from '@material-ui/core/Chip';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import LabelIcon from '@material-ui/icons/Label';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import Tooltip from '@material-ui/core/Tooltip';
import { Paper } from '@material-ui/core';


const RequestCard = ({ obj }) => {

    return (
        <Paper elevation={3}>
            <Card>
                {obj.author.name === null ? <></>
                    :
                    <div style={{ textAlign: 'center' }}>
                        <h2>{obj.author.name}님의 요청서</h2>
                        <small>요청일 : {obj.requestedAt}</small>
                    </div>
                }
                <CardContent>
                    <List>
                        {[
                            {
                                icon: () => <BuildIcon />,
                                title: '카테고리',
                                text: obj.category
                            },
                            // {
                            //     icon: () => <QueryBuilderIcon />,
                            //     title : '요청 마감일',
                            //     text: new Date(obj.deadLine).toLocaleString()
                            // },
                            {
                                icon: () => <AddCircleOutlineIcon />,
                                title: '상세설명',
                                text: obj.detail
                            },
                            {
                                icon: () => <LabelIcon />,
                                title: '태그',
                                text: obj.tags.map((obj2, index) => {
                                    return <span key={index}><Chip variant="outlined" size="small" label={obj2} />&nbsp;</span>
                                })
                            },
                            {
                                icon: () => <CalendarTodayIcon />,
                                title: '희망 제작 마감일',
                                text: obj.hopeDate
                            },
                        ].map((obj3, index3) => {
                            return (
                                <ListItem key={index3}>
                                    <ListItemIcon>
                                        <Tooltip arrow title={obj3.title}>
                                            {obj3.icon()}
                                        </Tooltip>
                                    </ListItemIcon>
                                    {/* <ListItemText
                                    primary={obj3.title,obj3.icon()}
                                /> */}
                                    <ListItemText
                                        primary={obj3.text}
                                    />
                                </ListItem>
                            )
                        })}
                    </List>
                </CardContent>
            </Card>
        </Paper>
    )
}

export default RequestCard
