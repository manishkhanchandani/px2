import {SEARCH_RESULT, DETAILS, SEARCH_TERM} from '../constants/actionConstants';

const searchReducer = (state = {
	search_term: null,
	searching: false,
	search_result: null,
	search_total_result: null,
	message: null,
	details: null
}, action) => {
	switch (action.type) {
		case SEARCH_TERM:
			state = {
				...state,
				search_term: action.payload
			}
			break;
		case SEARCH_RESULT:
			state = {
				...state,
				search_result: action.payload,
				search_total_result: parseInt(action.total, 10),
				searching: action.searching,
				message: action.message
			}
			break;
		case DETAILS:
			state = {
				...state,
				details: action.payload
			}
			break;
		default:
			break;
	}

	return state;
};

export default searchReducer;