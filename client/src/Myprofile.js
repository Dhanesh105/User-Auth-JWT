import React, { useContext, useState, useEffect, useCallback } from 'react'
import { store } from './App';
import { Redirect } from 'react-router';
import axios from 'axios';
import avatar from './avatar.png';
import { API_ENDPOINTS } from './config/api';

const Myprofile = () => {
    const [token, setToken] = useContext(store);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError('');
            const response = await axios.get(API_ENDPOINTS.PROFILE, {
                headers: {
                    'x-token': token
                }
            });

            if (response.data.success) {
                setData(response.data.user);
            }
        } catch (err) {
            console.error('Profile fetch error:', err);
            if (err.response?.status === 401) {
                // Token is invalid, logout user
                setToken(null);
                setData(null);
            } else {
                setError('Failed to load profile data');
            }
        } finally {
            setLoading(false);
        }
    }, [token, setToken]);

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token, fetchProfile]);

    const handleLogout = () => {
        setToken(null); // This will also clear localStorage
        setData(null);
    };

    if (!token) {
        return <Redirect to='/login' />
    }

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner" style={{ width: '40px', height: '40px' }}></div>
                <p className="loading-text">Loading your profile...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="profile-container">
                <div className="error-container">
                    <div className="error-icon">⚠️</div>
                    <h3 className="error-title">Oops! Something went wrong</h3>
                    <p className="error-message">{error}</p>
                    <button className="btn btn-primary" onClick={fetchProfile}>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="profile-container">
            {data && (
                <div className="profile-card">
                    <div className="profile-header">
                        <img className="profile-avatar" src={avatar} alt="User avatar" />
                        <h2 className="profile-name">Welcome, {data.username}!</h2>
                    </div>

                    <div className="profile-body">
                        <div className="profile-info">
                            <div className="profile-info-item">
                                <span className="profile-info-label">Username</span>
                                <span className="profile-info-value">{data.username}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">Email</span>
                                <span className="profile-info-value">{data.email}</span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">Member Since</span>
                                <span className="profile-info-value">
                                    {new Date(data.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">Account Status</span>
                                <span className="profile-info-value" style={{ color: 'var(--success-600)' }}>
                                    ✅ Active
                                </span>
                            </div>

                            <div className="profile-info-item">
                                <span className="profile-info-label">Security Level</span>
                                <span className="profile-info-value" style={{ color: 'var(--primary-600)' }}>
                                    🔒 High
                                </span>
                            </div>
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button
                                className="btn btn-secondary flex-1"
                                onClick={() => window.location.reload()}
                            >
                                Refresh Profile
                            </button>
                            <button
                                className="btn btn-danger flex-1"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>

                        <div className="mt-6 p-4 bg-primary-50 rounded-lg">
                            <h4 className="text-primary-800 mb-2">🎉 Welcome to SecureAuth!</h4>
                            <p className="text-primary-700 text-sm">
                                Your account is secure and ready to use. All your data is encrypted
                                and protected with industry-standard security measures.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Myprofile
