import { videoConstants } from '../_constants';

export function youtubeVideoGetInfo(state = {}, action) {
    switch (action.type) {
        case videoConstants.GET_INFO_REQUEST:
            return {};
        case videoConstants.GET_INFO_SUCCESS:
            return {
                detail: action.response.items[0]
            };
        case videoConstants.GET_INFO_FAILURE:
            return {};
        default:
            return state
    }
}