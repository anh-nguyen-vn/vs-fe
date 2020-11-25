import config from 'config';
import { authHeader } from '../_helpers';

export const videoService = {
    list,
    share
};

function list(pageRequest) {
    const encodeFormData = Object.keys(pageRequest)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(pageRequest[key]))
        .join('&');
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'client_id': config.clientId,
            'client_secret': config.clientSecret
        }
    };

    return fetch(`/api-gateway/user/v1.0/videos?${encodeFormData}`, requestOptions).then(handleResponse);
}

function share(video) {
    const requestOptions = {
        method: 'POST',
        headers: {
            ...authHeader(),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(video)
    };

    return fetch(`/api-gateway/user/v1.0/videos`, requestOptions).then(handleResponse);
}

function getComment(videoId) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(video)
    };

    return fetch(`/api-gateway/user/v1.0/videos/${videoId}/comments`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                return Promise.reject("Login session has been expired. Please login again");
            } else {
                const error = (data && data.status.message) || response.statusText;
                return Promise.reject(error);
            }
        }

        return data;
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}