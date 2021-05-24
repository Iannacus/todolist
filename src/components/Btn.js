import React from 'react';

function Btn({ text, event }) {
    return (
        <div className="btn-display">
            <button className='btn-add btn btn__primary' onClick={() => (event())}>
                {text}
            </button>
        </div>
    )
}

export default Btn;