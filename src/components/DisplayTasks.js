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
                text={'Show Pending'}
                event={pending}
            />
            <Btn
                text={'Show Completed'}
                event={completed}
            />
        </div>
    )
}

export default DisplayTasks;