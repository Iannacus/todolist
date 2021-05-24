import React, { useEffect, useState } from 'react';

function TodoItem({ task, student, id, hDelete, hUpdate, c }) {

    const [check, setCheck] = useState(false);
    useEffect(() => {
        setCheck(c)
    }, [c])

    return (
        <div className="task__container">
            <div className="task">
                <div className="task__info">
                    <div className="task__name">
                        <h4>{task}</h4>
                    </div>
                    <div className="student name">
                        <p>{student}</p>
                    </div>
                </div>
                <div className="checkbox-container one">
                    {check ? <input type="checkbox" onClick={(e) => hUpdate(id, e.target.checked)} id={id} checked /> : <input type="checkbox" onClick={(e) => hUpdate(id, e.target.checked)} id={id} />}
                    <label htmlFor={id}></label>
                    <div className="active"></div>

                </div>
                <div className='delete'>
                    <button className='button' onClick={() => hDelete(id)}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    )
}

export default TodoItem;