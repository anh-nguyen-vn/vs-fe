import config from 'config';
import { authHeader } from '../_helpers';
import { youtubeConstants } from '../_constants';

export const youtubeService = {
    getVideoInfo,
};

function getVideoInfo(videoUrl) {
    const videoId = videoUrl.split('v=')[1];
    const ampersandPosition = videoId.indexOf('&');
    if(ampersandPosition != -1) {
        videoId = videoId.substring(0, ampersandPosition);
    }
    if (videoId) {
        const formData ={
            part: 'snippet,contentDetails,statistics',
            id: videoId,
            fields: 'items(id,snippet,statistics(commentCount,likeCount,viewCount))',
            key: config.youTubeApiKey
        }
        const encodeFormData = Object.keys(formData)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]))
            .join('&');
        const requestOptions = {
            method: 'GET',
            headers: {}
        };
    
        return fetch(`https://www.googleapis.com/youtube/v3/videos?${encodeFormData}`, requestOptions).then(handleResponse);
    }
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        return data;
    });
}