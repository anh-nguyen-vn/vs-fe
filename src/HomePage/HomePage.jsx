import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from '../_components';
import { videoActions } from '../_actions';
import ReactPlayer from 'react-player';
import Pagination from 'react-js-pagination';
import { pageConstants } from '../_constants';

function HomePage() {
    const [pageRequest, setPageRequest] = useState({
        paging: 'true',
        page_index: 1,
        record_per_page: pageConstants.RECORD_PER_PAGE,
    });
    const videos = useSelector(state => state.videoListing);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(videoActions.list(pageRequest));
    }, [pageRequest]);

    function handlePageChange(pageNumber) {
        const currentPageRequest = { ...pageRequest, page_index: pageNumber };

        setPageRequest(currentPageRequest);
    }

    return (
        <div>
            <Header />
            <div className="container-fluid col-lg-8 offset-lg-2">
                {videos.error && <span className="text-danger">ERROR: {videos.error}</span>}
                {videos.items && videos.items.data &&
                    <div className="form-group">
                        {videos.items.data.map((video, index) =>
                            <div className="row" key={video.id}>
                                <div className="col player-wrapper">
                                    <ReactPlayer url={video.url} />
                                </div>
                                <div className="col">
                                    <h4 style={{color: "red"}}>{video.title}</h4>
                                    <p>Shared by {video.shared_by_user_username}</p>
                                    <p style={{fontWeight: "bold"}}>Description:</p>
                                    <p>{video.description}</p>
                                </div>
                            </div>
                        )}
                        <div className="row">
                            <Pagination
                                hideDisabled
                                activePage={pageRequest.page_index}
                                itemsCountPerPage={pageConstants.RECORD_PER_PAGE}
                                totalItemsCount={videos.items.page.total_elements}
                                onChange={handlePageChange.bind(this)}
                                itemClass="page-item"
                                linkClass="page-link"
                            />
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export { HomePage };