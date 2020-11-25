import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { alert } from './alert.reducer';
import { videoListing } from './videoListing.reducer';
import { videoSharing } from './videoSharing.reducer';
import { youtubeVideoGetInfo } from './youtubeVideoGetInfo.reducer';

const rootReducer = combineReducers({
    authentication,
    registration,
    alert,
    videoListing,
    videoSharing,
    youtubeVideoGetInfo,
});

export default rootReducer;