import React from 'react';
import Btn from './Btn';

function Succesufully({ message, close }) {
    return (
        <div className='message'>
            <i className="fas fa-check-circle"></i>
            <p>{message}</p>
            <Btn
                text={'Accept'}
                event={close}
                show={false}
            />
        </div>
    );
}

export default Succesufully;