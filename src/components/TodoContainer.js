import React, { useState, useEffect } from 'react';
import read from './services/read';
import create from './services/create';
import deleteTask from './services/deleteT'
import update from './services/update'
import TodoItem from './TodoItem';
import CreateTask from './CreateTask';
import DisplayTasks from './DisplayTasks'
import Loader from './Loader';
import Pagination from './Pagination';
import Succesufully from './Succesufully';

function TodoContainer() {
    //app states
    const [tasks, setTasks] = useState([]);
    const [tasksArray, setTasksArray] = useState([]);
    const [taskToCreate, setTaskToCreate] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [buttons, setButtons] = useState(0);
    const [pagination, setPagination] = useState(1);
    const [displayText, setDisplayText] = useState('All Tasks');
    const [pendingTasks, setPendingTasks] = useState(0);
    const [showSucces, setShowSucces] = useState(false);
    const [succesMessage, setSuccesMessage] = useState('');
    //variables for calc task pagination
    let start = ((pagination - 1) * 6);
    const end = start + 6;
    //Read api data
    useEffect(() => {
        read().then((data) => {
            setTasks(data.todos);
        });
    }, []);
    //Create api new task
    useEffect(() => {
        setShowForm(false);
        if (taskToCreate) {
            setIsLoading(true);
            create(taskToCreate).then(() => {
                setIsLoading(false);
                read().then((data) => {
                    setTasks(data.todos)
                });
                setIsLoading(false);
                setTaskToCreate(null);
            });
        }
    }, [taskToCreate]);
    //Delete api task
    useEffect(() => {
        if (taskToDelete) {
            setIsLoading(true);
            deleteTask(taskToDelete).then(() => {
                read().then((data) => {
                    setTasks(data.todos)
                });
                setIsLoading(false);
            })
        }
    }, [taskToDelete]);
    //Create task pagination
    useEffect(() => {
        if (tasks.length > 0) {
            setButtons(Math.ceil(tasks.length / 6));
            setTasksArray(tasks.slice(start, end));
        }
    }, [pagination, tasks, start, end])
    //Show Spiner while data are loading
    useEffect(() => {
        setIsLoading(true);
        if (tasks.length > 0) {
            setIsLoading(false);
            //counting for pending tasks
            const arr = tasks.filter(task => task.isCompleted !== true)
            setPendingTasks(arr.length);
        }
    }, [tasks, isLoading])
    //Handle Values for api task creation
    const handleCreateTask = values => {
        setTaskToCreate(values);
        handleSucces(true, 'Task Created Succesfully');
    }
    //handle id for api task delete
    const handleDelete = (identifier) => {
        setTaskToDelete(identifier);
        handleSucces(true, 'task Deleted Succesfully');
    }
    //handle api task update check status
    const handleUpdate = (identifier, isChecked) => {
        setDisplayText('All Tasks');
        update(identifier, isChecked).then((data) => {
            read().then((data) => {
                setTasks(data.todos);
            });
            setIsLoading(false);
        });
        handleSucces(true, 'task Updated Succesfully');
    }
    const handlePagination = (e) => {
        setPagination(e.target.textContent);
    }
    //know when form should show in app
    const handleShow = value => {
        setShowForm(value);
    }
    //set Array tasks to display all tasks
    const handleDisplayAll = () => {
        setTasksArray(tasks);
        setDisplayText('All Tasks');
    };
    //set Array tasks to display pending tasks
    const handleDisplayPending = () => {
        setTasksArray(tasks.filter(task =>
            task.isCompleted !== true
        ));
        setDisplayText('Pending Tasks');
    };
    //set Array tasks to display completed tasks
    const handleDisplayCompleted = () => {
        setTasksArray(tasks.filter(task =>
            task.isCompleted === true
        ));
        setDisplayText('Completed Tasks');
    };
    const handleSucces = (value = false, message = '') => {
        setShowSucces(value);
        setSuccesMessage(message);
    };
    //create a tasks list to display in app 
    const list = tasksArray.map(task => {
        return (
            <TodoItem
                task={task.task}
                student={task.student}
                id={task.id}
                c={task.isCompleted}
                hDelete={handleDelete}
                hUpdate={handleUpdate}
                key={task.id}
            />
        );
    });

    return (
        <>
            <div className='date'>
                <h2>Welcome! Click on add a new task</h2>
            </div>
            <div className="add">
                <button className='btn btn-add btn__primary' onClick={() => {
                    handleShow(true);
                }}>
                    <i className="fas fa-plus-circle"></i> Add New Task
                </button>
            </div>
            <DisplayTasks
                all={handleDisplayAll}
                pending={handleDisplayPending}
                completed={handleDisplayCompleted}
                pendingTasks={pendingTasks}
            />
            <h2>{displayText}</h2>
            <Pagination
                buttons={buttons}
                pagination={handlePagination}
            />
            <div className='tasks'>
                {isLoading ? <Loader /> : list}
                {showForm ?
                    <CreateTask
                        handleCreate={handleCreateTask}
                        show={handleShow}
                    /> : null}
            </div>
            {showSucces ? <Succesufully
                message={succesMessage}
                close={handleSucces}
            /> : null}
        </ >
    );
}

export default TodoContainer;