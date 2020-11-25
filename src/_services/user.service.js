import config from 'config';
import { encrypt } from '../_helpers';

export const userService = {
    login,
    logout,
    register
};

function login(username, password) {
    const encryptedPassword = encrypt(password);
    const parmas = {
        grant_type: 'password',
        username: username,
        password: encryptedPassword,
        client_id: config.clientId
    };
    const encodeFormData = Object.keys(parmas)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(parmas[key]))
        .join('&');
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            'client_id': config.clientId,
            'client_secret': config.clientSecret
        },
        body: encodeFormData
    };

    return fetch(`/api-gateway/v1.0/user/oauth/token`, requestOptions)
        .then(handleAuthResponse)
        .then(response => {
            response = {...response, username}
            // store access token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(response));

            return response;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    const profilePayload = {
        email: user.username
    };
    const encryptedPassword = encrypt(user.password);
    const identityPayload = {
        username: user.username,
        password: encryptedPassword
    }
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'client_id': config.clientId,
            'client_secret': config.clientSecret
        },
        body: JSON.stringify({
            profile: profilePayload,
            identity: identityPayload
        })
    };

    return fetch(`/api-gateway/user/v1.0/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                return Promise.reject('Login session has been expired. Please login again');
            } else {
                const error = (data && data.status.message) || response.statusText;
                return Promise.reject(error);
            }
        }

        return data;
    });
}

function handleAuthResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.error_description) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}