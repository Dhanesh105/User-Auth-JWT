import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { store } from './App';
import { Redirect } from 'react-router';
import { API_ENDPOINTS } from './config/api';

const Login = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState([]);

    const changeHandler = e => {
        setData({ ...data, [e.target.name]: e.target.value });
        // Clear errors when user starts typing
        if (errors.length > 0) {
            setErrors([]);
        }
        if (message) {
            setMessage('');
        }
    }

    const submitHandler = async e => {
        e.preventDefault();
        setLoading(true);
        setErrors([]);
        setMessage('');

        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, data);

            if (response.data.success) {
                // Use the enhanced setToken function that handles localStorage
                setToken(response.data.token, response.data.user);
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    if (token) {
        return <Redirect to='/myprofile' />
    }

    return (
        <div className="auth-container">
            <div className="auth-card animate-scaleIn">
                <div className="auth-header">
                    <h2>Welcome Back</h2>
                    <p className="mt-2 text-primary-100">Sign in to your account</p>
                </div>

                <div className="auth-body">
                    <form onSubmit={submitHandler} autoComplete="off">
                        {message && (
                            <div className="alert alert-error">
                                {message}
                            </div>
                        )}

                        {errors.length > 0 && (
                            <div className="alert alert-error">
                                {errors.map((error, index) => (
                                    <div key={index}>{error.msg}</div>
                                ))}
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                onChange={changeHandler}
                                name="email"
                                value={data.email}
                                placeholder="Enter your email"
                                className="form-input"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                onChange={changeHandler}
                                name="password"
                                value={data.password}
                                placeholder="Enter your password"
                                className="form-input"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="spinner"></div>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>

                <div className="auth-footer">
                    <p>
                        Don't have an account? {' '}
                        <Link to="/register">Create one here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
