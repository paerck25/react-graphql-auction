import React from 'react';
import { Route } from 'react-router-dom';
import JoinSelect from './JoinSelect'
import JoinForm from './JoinForm';

const JoinHome = () => {
    return (
        <div>
            <Route exact path='/join' component={JoinSelect} />
            <Route path='/join/form' component={JoinForm} />
        </div>
    )
}

export default JoinHome;