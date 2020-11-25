import config from 'config';

export function authHeader() {
    // return authorization header with access token
    let user = JSON.parse(localStorage.getItem('user'));
    if (user && user.access_token) {
        return { 
            'Authorization': 'Bearer ' + user.access_token,
            'client_id': config.clientId,
            'client_secret': config.clientSecret
        };
    } else {
        return {
            'client_id': config.clientId,
            'client_secret': config.clientSecret
        };
    }
}