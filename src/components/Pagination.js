import React from 'react';

function Pagination({ buttons, pagination }) {
    const buttonsList = [];
    //create a list for each pagination button
    if (buttons > 1) {
        for (let i = 1; i <= buttons; i++) {
            buttonsList.push(
                <button className='pagination__button custom'
                    key={i}
                    onClick={e => (pagination(e))}
                >{i}
                </button>
            )
        }
    }

    return (
        <div className='pagination'>
            {buttonsList}
        </div>
    );
}

export default Pagination;