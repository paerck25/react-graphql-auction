import React,{useState} from 'react'
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { GET_MY_PROFILE_IMAGE } from '../../../lib/queries';
import { CircularProgress, Container, Grid, CardHeader, Divider, Card, CardContent, Typography, Button } from '@material-ui/core';
import { useLazyQuery } from '@apollo/client';

const ChoesnList = ({data,handleChatOpen}) => {

    const [checked, setChecked] = useState(false);

    const onClickChecked = () => {
        if (checked) {
            setChecked(false);
        } else {
            setChecked(true);
        }
    }

    const ChosenList = data.filter((obj) => {
        return obj.state === '거래 진행중';
    })


    const MyChosenList = ChosenList.map((obj) => {

        return (
            <Grid key={obj.request._id} style={{ margin: 'auto' }} item xs={4}>
                <Collapse in={checked} collapsedHeight={88}>
                    <Card elevation={3}>
                        <CardHeader onClick={onClickChecked} action={checked ? <ExpandLessIcon /> : <ExpandMoreIcon />} style={{ textAlign: 'center' }} title={`${obj.request.author.name}님의 요청서`} subheader={obj.request.requestedAt} />
                        <Divider />
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Button style={{ width: '100%' }} variant="outlined">
                                        자세히
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={() => { handleChatOpen(obj.request._id) }} style={{ width: '100%' }} variant="outlined">
                                        1:1 채팅
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Collapse>
            </Grid>
        )
    })

    return (
        <Container>
            {ChosenList.length === 0
                ?
                <Typography variant="h5" gutterBottom style={{ textAlign: 'center' }}>현재 진행중인 거래가 없습니다.</Typography>
                :
                <Grid container>
                    {MyChosenList}
                </Grid>
            }
        </Container>
    )
}

export default ChoesnList
