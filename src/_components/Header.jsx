import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../_actions';
import { history } from '../_helpers';

function Header({ component: Component, roles, ...rest }) {
    const [inputs, setInputs] = useState({
        username: '',
        password: ''
    });
    const [submitted, setSubmitted] = useState(false);
    const { username, password } = inputs;
    const loggingIn = useSelector(state => state.authentication.loggingIn);
    const location = useLocation();
    const dispatch = useDispatch();

    function handleChange(e) {
        const { name, value } = e.target;
        setInputs(inputs => ({ ...inputs, [name]: value }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);
        if (username && password) {
            // get return url from location state or default to home page
            const { from } = location.state || { from: { pathname: "/" } };
            dispatch(userActions.login(username, password, from));
        }
    }

    function handleLogout(e) {
        e.preventDefault();
        dispatch(userActions.logout()); 
        history.push('/');
    }

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="header">
            <Link to="/" className="home logo">Funny Movies</Link>
            {user && user.access_token &&
                <Link to="/movie-sharing" className="btn btn-primary" style={{marginLeft: "5px"}}>
                    Share a Movie
                </Link>
            }
            <div style={{float: "right"}}>
                {user && user.access_token ?
                    <form className="form-inline">
                        <span className="mr-sm-2">Welcome {JSON.parse(localStorage.getItem('user')).username}</span>
                        {/* <button className="btn btn-link mb-2" onClick={history.push('/movie-sharing')}>
                            Share a movie
                        </button> */}
                        <button className="btn btn-secondary mb-2" onClick={handleLogout}>
                            Logout
                        </button>
                    </form>
                    :
                    <form className="form-inline" onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="col">
                                <input type="text" name="username" className="form-control" value={username} placeholder="Email" onChange={handleChange} className={'form-control' + (submitted && !username ? ' is-invalid' : '')} />
                                {submitted && !username &&
                                    <div className="invalid-feedback">Email is required</div>
                                }
                            </div>
                            <div className="col">
                                <input type="password" name="password" className="form-control" value={password} placeholder="Password" onChange={handleChange} className={'form-control' + (submitted && !password ? ' is-invalid' : '')} />
                                {submitted && !password &&
                                    <div className="invalid-feedback">Password is required</div>
                                }
                            </div>
                            <div className="col">
                                <button className="btn btn-primary">
                                    {loggingIn && <span className="spinner-border spinner-border-sm mr-1"></span>}
                                    Login
                                </button>
                            </div>
                            <div className="col">
                                <Link to="/register" className="btn btn-link">Register</Link>
                            </div>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}

export { Header };