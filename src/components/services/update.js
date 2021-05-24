const baseUrl = 'https://todos-go.herokuapp.com/api/todos';

const update = (id, checked) => {
    console.log(id, checked);
    const promise = fetch(`${baseUrl}/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            "task": "none",
            "student": "none",
            "isCompleted": checked
        }),
        headers: new Headers().set('content-type', 'application/json')
    })
    return promise;
}

export default update;