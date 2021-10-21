// Actions
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const UPDATE_USER = 'UPDATE_USER';


// Action Creators
export function setMovies(value) {
    return {
        type: SET_MOVIES,
        value
    };
}

export function setFilter(value) {
    return {
        type: SET_FILTER,
        value
    };
}

export function setUser(value) {
    console.log('SET_USER action reached');
    return { type: SET_USER, value };
}

export function updateUser(value) {
    console.log('UPDATE_USER action reached');
    return { type: UPDATE_USER, value };
}