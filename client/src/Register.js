import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from './config/api';

const Register = () => {
    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
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
            const response = await axios.post(API_ENDPOINTS.REGISTER, data);

            if (response.data.success) {
                setMessage('Registration successful! You can now login.');
                setData({
                    username: '',
                    email: '',
                    password: '',
                    confirmpassword: ''
                });
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            } else if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage('Registration failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card animate-scaleIn">
                <div className="auth-header">
                    <h2>Create Account</h2>
                    <p className="mt-2 text-primary-100">Join us today and get started</p>
                </div>

                <div className="auth-body">
                    <form onSubmit={submitHandler} autoComplete="off">
                        {message && (
                            <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-error'}`}>
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
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                onChange={changeHandler}
                                name="username"
                                value={data.username}
                                placeholder="Choose a username"
                                className="form-input"
                                required
                            />
                        </div>

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
                                placeholder="Create a strong password"
                                className="form-input"
                                required
                            />
                            <small className="text-neutral-500 text-xs mt-1 block">
                                Must include uppercase, lowercase, and numbers
                            </small>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmpassword">
                                Confirm Password
                            </label>
                            <input
                                id="confirmpassword"
                                type="password"
                                onChange={changeHandler}
                                name="confirmpassword"
                                value={data.confirmpassword}
                                placeholder="Confirm your password"
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
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>
                </div>

                <div className="auth-footer">
                    <p>
                        Already have an account? {' '}
                        <Link to="/login">Sign in here</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
