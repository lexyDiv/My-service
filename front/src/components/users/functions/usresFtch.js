import axios from "axios";

export async function usersFetch({ setUsers, dispatch }) {
    dispatch({ type: 'SET_LOADING', payload: true });
    axios.get('/users/all').then(res => {
        const { message, users } = res.data;
        if(message === 'ok') {
            setUsers(users);
        }
    })
    .catch(err => console.log(err.message))
    .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
}