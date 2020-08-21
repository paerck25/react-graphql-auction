import React, { useEffect, useState } from 'react';
import {REQUEST_TIME_OVER} from '../lib/queries';
import { useMutation } from '@apollo/client';
import Axios from 'axios';

const Counter = ({data}) => {
    const [start, setStart] = useState(parseInt(new Date().getTime() / 1000));
    const [end] = useState(parseInt(new Date(data.deadLine) / 1000));

    const [ timeOver ] = useMutation(REQUEST_TIME_OVER,{
        variables : {
            request : data._id
        }
    })

    useEffect(() => {
        let interval;
        if (parseInt(end - start) <= 0) {
            timeOver();
            clearInterval(interval);
            console.log('stop');
        } else {
            interval = setInterval(() => {
                countDown();
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [end, start]);


    function countDown() {
        setStart(parseInt(new Date().getTime() / 1000));
    }
    let hour = parseInt((end - start) / 60 / 60);
    let minutes = parseInt(((end - start) / 60) % 60);
    let seconds = parseInt((end - start) % 60);
    return (
        <>
        {
        (parseInt(end - start) <= 0)
            ?
            <span>요청 마감</span>
            :
        <>
            {hour > 9 ? <span>요청 마감까지 : {hour}:</span> : <span>요청 마감까지 : 0{hour}:</span>}
            {minutes > 9 ? <span>{minutes}:</span> : <span>0{minutes}:</span>}
            {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
        </>
        }
        </>
    )
}


// const Counter = ({data}) => {
//     const [start, setStart] = useState(parseInt(new Date().getTime() / 1000));
//     const [end] = useState(parseInt(new Date(data.deadLine) / 1000));

//     const requestTimeOver = () => {
//         Axios.post('/request-over',{
//             request : data._id
//         })
//         .then(res=>{
//             console.log(res.data);
//         })
//         .catch(err=>{
//             console.log(err);
//         })
//     }

//     useEffect(() => {
//         let interval;
//         if (parseInt(end - start) <= 0) {
//             requestTimeOver();
//             clearInterval(interval);
//             console.log('stop');
//         } else {
//             interval = setInterval(() => {
//                 countDown();
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [end, start]);


//     function countDown() {
//         setStart(parseInt(new Date().getTime() / 1000));
//     }
//     let hour = parseInt((end - start) / 60 / 60);
//     let minutes = parseInt(((end - start) / 60) % 60);
//     let seconds = parseInt((end - start) % 60);
//     return (
//         <>
//         {
//         (parseInt(end - start) <= 0)
//             ?
//             <span>요청 마감</span>
//             :
//         <>
//             {hour > 9 ? <span>요청 마감까지 : {hour}:</span> : <span>요청 마감까지 : 0{hour}:</span>}
//             {minutes > 9 ? <span>{minutes}:</span> : <span>0{minutes}:</span>}
//             {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
//         </>
//         }
//         </>
//     )
// }

export default Counter;