import React from 'react';
import { useForm } from 'react-hook-form';

const CreateTask = ({ handleCreate, show }) => {
    const { handleSubmit, register } = useForm();
    const onSubmit = values => {
        handleCreate(values);
    }
    return (
        <div className="createTask">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input className='blanco' type="text" placeholder='what do you need to do' {...register('task', { required: true })} />
                <input type="text" placeholder='Student Name' {...register('student', { required: true })} />
                <button className='submit-btn btn btn__secondary' type='submit'><i className="fas fa-tasks"></i>  Create</button>
            </form>
            <div className='close'>
                <i className="fas fa-window-close" onClick={() => { show(false) }}></i>
            </div>
        </div>
    );
};


export default CreateTask;