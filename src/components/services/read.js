const baseUrl = 'https://todos-go.herokuapp.com/api/todos';

const read = () => {
    const promise = fetch(`${baseUrl}`)
    return promise.then(res => res.json());
}

export default read;