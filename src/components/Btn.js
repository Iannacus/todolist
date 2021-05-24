import React from 'react';

function Btn({ text, event, show, pendingTasks }) {
    return (
        <div className="btn-display">
            <button className='btn-add btn btn__primary' onClick={() => (event())}>
                {text}
            </button>
            {show ? <div class='displayPendings'>{pendingTasks}</div> : null}
        </div>
    )
}

export default Btn;