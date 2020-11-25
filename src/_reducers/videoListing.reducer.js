import { videoConstants } from '../_constants';

export function videoListing(state = {}, action) {
    switch (action.type) {
        case videoConstants.LIST_REQUEST:
            return {
                loading: true
            };
        case videoConstants.LIST_SUCCESS:
            return {
                items: action.response.data
            };
        case videoConstants.LIST_FAILURE:
            return {};
        default:
            return state
    }
}