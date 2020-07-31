import React, { useEffect, useState } from 'react';


const Counter = ({data}) => {
    const [start, setStart] = useState(parseInt(new Date().getTime() / 1000));
    const [end] = useState(parseInt(new Date(data.deadLine) / 1000));

    useEffect(() => {
        let interval;
        if (parseInt(end - start) <= 0) {
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
            <h4>경매 마감</h4>
            :
        <>
            {hour > 9 ? <span>경매 마감 : {hour}:</span> : <span>경매 마감 : 0{hour}:</span>}
            {minutes > 9 ? <span>{minutes}:</span> : <span>0{minutes}:</span>}
            {seconds > 9 ? <span>{seconds}</span> : <span>0{seconds}</span>}
        </>
        }
        </>
    )
}

export default Counter;