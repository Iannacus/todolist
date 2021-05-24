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

function TodoContainer() {
    const [tasks, setTasks] = useState([]);
    const [tasksArray, setTasksArray] = useState([]);
    const [taskToCreate, setTaskToCreate] = useState(null);
    const [taskToDelete, setTaskToDelete] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [buttons, setButtons] = useState(0);
    const [pagination, setPagination] = useState(1);
    let start = ((pagination - 1) * 6);
    const end = start + 6;

    useEffect(() => {
        read().then((data) => {
            setTasks(data.todos);
            console.log(data.todos);
        });
    }, []);

    useEffect(() => {
        setShowForm(false);
        if (taskToCreate) {
            setIsLoading(true);
            create(taskToCreate).then(res => {
                setIsLoading(false);
                read().then((data) => {
                    setTasks(data.todos)
                });
                setIsLoading(false);
                setTaskToCreate(null);
            }, (err) => {
                console.error(err);
            });

        }
    }, [taskToCreate]);

    useEffect(() => {
        if (taskToDelete) {
            setIsLoading(true);
            deleteTask(taskToDelete).then(res => {
                read().then((data) => {
                    setTasks(data.todos)
                    console.log(data.todos)
                });
                setIsLoading(false);
            })
        }
    }, [taskToDelete]);


    useEffect(() => {
        if (tasks.length > 0) {
            setButtons(Math.ceil(tasks.length / 6));
            setTasksArray(tasks.slice(start, end));
        }
    }, [pagination, tasks, start, end])

    useEffect(() => {
        setIsLoading(true);
        if (tasks.length > 0) {
            setIsLoading(false);
        }
    }, [tasks, isLoading])



    const handleCreateTask = values => {
        setTaskToCreate(values);
        console.log(values);
    }

    const handleDelete = (identifier) => {
        setTaskToDelete(identifier);
    }

    const handleUpdate = (identifier, isChecked) => {
        update(identifier, isChecked).then((data) => {
            console.log(data);
            read().then((data) => {
                setTasks(data.todos);
            });
            setIsLoading(false);
        });
    }

    const handlePagination = (e) => {
        setPagination(e.target.textContent);
    }

    const handleShow = value => {
        setShowForm(value);
    }

    const handleDisplayAll = () => {
        setTasksArray(tasks);
    };

    const handleDisplayPending = () => {
        setTasksArray(tasks.filter(task =>
            task.isCompleted !== true
        ));
    };

    const handleDisplayCompleted = () => {
        setTasksArray(tasks.filter(task =>
            task.isCompleted === true
        ));
    };

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
                <h2>Welcome! Click on create to add a new task</h2>
            </div>
            <div className="add">
                <button className='btn-add' onClick={() => {
                    handleShow(true);
                }}>
                    <i className="fas fa-plus-circle"></i> Add New Task
                </button>
            </div>
            <DisplayTasks
                all={handleDisplayAll}
                pending={handleDisplayPending}
                completed={handleDisplayCompleted}
            />
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

        </ >
    );
}

export default TodoContainer;