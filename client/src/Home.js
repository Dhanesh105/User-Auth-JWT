import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { store } from './App';

const Home = () => {
    const [token, , user] = useContext(store);

    return (
        <div className="hero-section">
            <div className="hero-content animate-fadeIn">
                {!token ? (
                    <>
                        <h1 className="hero-title">
                            Welcome to SecureAuth
                        </h1>
                        <p className="hero-subtitle">
                            A modern, secure authentication system built with MERN stack and JWT tokens. 
                            Experience seamless login, robust security, and elegant design.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/register" className="btn btn-primary btn-lg">
                                Get Started
                            </Link>
                            <Link to="/login" className="btn btn-secondary btn-lg">
                                Sign In
                            </Link>
                        </div>
                        
                        <div className="mt-8">
                            <div className="flex justify-center gap-8 text-center">
                                <div className="animate-slideIn" style={{ animationDelay: '0.2s' }}>
                                    <div className="text-primary-600 text-4xl mb-2">🔒</div>
                                    <h3 className="text-lg font-semibold mb-2">Secure</h3>
                                    <p className="text-neutral-600">Advanced encryption and JWT authentication</p>
                                </div>
                                <div className="animate-slideIn" style={{ animationDelay: '0.4s' }}>
                                    <div className="text-primary-600 text-4xl mb-2">⚡</div>
                                    <h3 className="text-lg font-semibold mb-2">Fast</h3>
                                    <p className="text-neutral-600">Lightning-fast performance and response times</p>
                                </div>
                                <div className="animate-slideIn" style={{ animationDelay: '0.6s' }}>
                                    <div className="text-primary-600 text-4xl mb-2">🎨</div>
                                    <h3 className="text-lg font-semibold mb-2">Modern</h3>
                                    <p className="text-neutral-600">Beautiful, responsive design that works everywhere</p>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="hero-title">
                            Welcome back, {user?.username}!
                        </h1>
                        <p className="hero-subtitle">
                            You're successfully logged in. Access your profile to view your account details 
                            and manage your settings.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/myprofile" className="btn btn-primary btn-lg">
                                View Profile
                            </Link>
                        </div>
                        
                        <div className="mt-8">
                            <div className="card" style={{ maxWidth: '400px', margin: '0 auto' }}>
                                <div className="card-body text-center">
                                    <h3 className="mb-4">Quick Stats</h3>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-neutral-600">Account Status:</span>
                                        <span className="text-success-600 font-semibold">Active</span>
                                    </div>
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-neutral-600">Security Level:</span>
                                        <span className="text-primary-600 font-semibold">High</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-neutral-600">Last Login:</span>
                                        <span className="text-neutral-800 font-semibold">Just now</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
