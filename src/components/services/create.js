const baseUrl = 'https://todos-go.herokuapp.com/api/todos';

const create = (task) => {
    const promise = fetch(`${baseUrl}`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: new Headers().set('content-type', 'application/json')
    })
    return promise;
}

export default create;