import React from 'react';
import Btn from './Btn'

function DisplayTasks({ all, pending, completed, pendingTasks }) {
    let show = false;
    pendingTasks > 0 ? show = true : show = false;
    return (
        <div className="displayButtons">
            <Btn
                text={'Show All'}
                event={all}
                show={false}
            />
            <Btn
                text={'Pending'}
                event={pending}
                show={show}
                pendingTasks={pendingTasks}
            />
            <Btn
                text={'Completed'}
                event={completed}
                show={false}
            />
        </div>
    )
}

export default DisplayTasks;