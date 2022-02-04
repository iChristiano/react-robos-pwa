import { 
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
    SELECTED_ROBOT,
    MODAL,
    SW_INIT,
    SW_UPDATE,
    ONLINE
} from './constants';

export const setSearchField = (text) => ({
    type: CHANGE_SEARCH_FIELD,
    payload: text
});

export const requestRobots = () => (dispatch) => {
    dispatch({ type: REQUEST_ROBOTS_PENDING });
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => { return response.json(); })
    .then((data) => { dispatch({ type: REQUEST_ROBOTS_SUCCESS, payload: data });})
    .catch(error => { dispatch({ type: REQUEST_ROBOTS_FAILED, payload: error });});
};

export const setSelectedRobot = (selectedRobot) => ({
    type: SELECTED_ROBOT,
    payload: selectedRobot
});

export const updateModal = (modal) => ({
    type: MODAL,
    payload: modal
});

export const setSwInit = (registration) => ({ 
    type: SW_INIT,
    payload: registration 
});

export const setSwUpdate = (registration) => ({ 
    type: SW_UPDATE, 
    payload: registration 
});

export const updateOnline = (isOnline) => ({
    type: ONLINE, 
    payload: isOnline 
});

