import { videoConstants } from '../_constants';
import { videoService, youtubeService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const videoActions = {
    list,
    share,
    getInfo,
};

function list(pageRequest) {
    return dispatch => {
        dispatch(request());

        videoService.list(pageRequest)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: videoConstants.LIST_REQUEST } }
    function success(response) { return { type: videoConstants.LIST_SUCCESS, response } }
    function failure(error) { return { type: videoConstants.LIST_FAILURE, error } }
}

function share(video) {
    return dispatch => {
        dispatch(request());

        videoService.share(video)
            .then(
                response => { 
                    dispatch(success());
                    history.push('/');
                    dispatch(alertActions.success('Thanks for sharing your movie'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: videoConstants.SHARE_REQUEST } }
    function success(response) { return { type: videoConstants.SHARE_SUCCESS, response } }
    function failure(error) { return { type: videoConstants.SHARE_FAILURE, error } }
}

function getInfo(videoUrl) {
    return dispatch => {
        dispatch(request());

        youtubeService.getVideoInfo(videoUrl)
            .then(
                response => dispatch(success(response)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: videoConstants.GET_INFO_REQUEST } }
    function success(response) { return { type: videoConstants.GET_INFO_SUCCESS, response } }
    function failure(error) { return { type: videoConstants.GET_INFO_FAILURE, error } }
}