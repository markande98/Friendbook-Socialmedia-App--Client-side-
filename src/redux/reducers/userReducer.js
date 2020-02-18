import { SET_USER,  SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_USER, LIKE_SCREAM, UNLIKE_SCREAM} from '../types';

const initiaState = {
    authenticated: false,
    credentials: {},
    loading : false,
    likes: [],
    notifications: []
}

export default function(state = initiaState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            }
        case SET_UNAUTHENTICATED:
            return {
                initiaState
            }
        case SET_USER:
            return {
                authenticated: true,
                loading : false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading : true
            }
        case LIKE_SCREAM:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle : state.credentials.handle,
                        screamId: action.payload.screamId
                    }
                ]
            }
        case UNLIKE_SCREAM: 
            return {
                ...state,
                likes : state.likes.filter(
                    (like) => like.screamId !== action.payload.screamId
                )
            }
        default:
            return state;
    }
}