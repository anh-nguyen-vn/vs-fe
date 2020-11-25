import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { videoActions } from '../_actions';
import { Header } from '../_components';

function VideoSharingPage() {
    const [video, setVideo] = useState({
        url: '',
        title: '',
        description: ''
    });
    const youtubeVideoDetail = useSelector(state => state.youtubeVideoGetInfo);
    const [submitted, setSubmitted] = useState(false);
    const videoSharing = useSelector(state => state.videoSharing);
    const dispatch = useDispatch();

    useEffect(() => {
        if (video.url && youtubeVideoDetail && youtubeVideoDetail.detail && youtubeVideoDetail.detail.snippet) {
            setVideo(video => ({
                ...video,
                title: youtubeVideoDetail.detail.snippet.title,
                description: youtubeVideoDetail.detail.snippet.description,
            }));
        }
    }, [youtubeVideoDetail]);


    function handleChange(e) {
        const { name, value } = e.target;
        setVideo(video => ({ ...video, [name]: value }));
        if (value) {
            dispatch(videoActions.getInfo(value));
        }
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (video.url) {
            dispatch(videoActions.share(video));
        }
    }

    return (
        <div>
            <Header />
            <div className="col-lg-8 offset-lg-2">
                <form name="form" onSubmit={handleSubmit}>
                    <div className="form-group">
                    <h2>Share a Youtube movie</h2>
                        <div className="row">
                            <input type="text" name="url" placeholder="https://www.youtube.com" value={video.url} onChange={handleChange} className={'form-control' + (submitted && !video.url ? ' is-invalid' : '')} />
                            {submitted && !video.url &&
                                <div className="invalid-feedback">URL is required</div>
                            }
                        </div>
                        <div className="row">
                            {video.title &&
                                <div>
                                    <h4>Title</h4>
                                    <p>{video.title}</p>
                                </div>
                            }
                        </div>
                        <div className="row">
                            {video.description &&
                                <div>
                                    <h4>Description</h4>
                                    <p>{video.description}</p>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {videoSharing.sharing && <span className="spinner-border spinner-border-sm mr-1"></span>}
                            Share
                        </button>
                        <Link to="/" className="btn btn-link">Cancel</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export { VideoSharingPage };