import React from 'react';
import Btn from './Btn'

function DisplayTasks({ all, pending, completed }) {
    return (
        <div className="displayButtons">
            <Btn
                text={'Show All'}
                event={all}
            />
            <Btn
                text={'Pending'}
                event={pending}
            />
            <Btn
                text={'Completed'}
                event={completed}
            />
        </div>
    )
}

export default DisplayTasks;