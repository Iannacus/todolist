const baseUrl = 'https://todos-go.herokuapp.com/api/todos';

const deleteTask = (id) => {
    const promise = fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: new Headers().set('content-type', 'application/json')
    })
    return promise;
}

export default deleteTask;