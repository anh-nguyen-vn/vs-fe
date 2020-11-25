import React, { useEffect } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { RegisterPage } from '../RegisterPage';
import { VideoSharingPage } from '../VideoSharingPage';

function App() {
    const alert = useSelector(state => state.alert);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }, []);

    return (
        <div>
            {alert.message &&
                <div className={`alert ${alert.type}`}>{alert.message}</div>
            }
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/register" component={RegisterPage} />
                    <PrivateRoute path="/movie-sharing" component={VideoSharingPage} />
                    <Redirect from="*" to="/" />
                </Switch>
            </Router>
        </div>
    );
}

export { App };