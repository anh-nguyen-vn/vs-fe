import { videoConstants } from '../_constants';

export function videoSharing(state = {}, action) {
    switch (action.type) {
        case videoConstants.SHARE_REQUEST:
            return { sharing: true };
        case videoConstants.SHARE_SUCCESS:
            return {};
        case videoConstants.SHARE_FAILURE:
            return {};
        default:
            return state
    }
}