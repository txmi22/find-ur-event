const initialState = {
    bookmarkedEvents: []
}

const ADD_EVENT = 'ADD_EVENT';

export const eventAdded = events => {
    console.log('event reducer line 8: ', events)
    return {
        type: ADD_EVENT,
        payload: events
    }
}

export default function eventReducer(state = initialState, action){
    const {type, payload} = action;
    switch(type){
        case ADD_EVENT:
            return {...state, bookmarkedEvents: payload}
        default:
            return state;
    }
}