import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { store } from './App';

const Nav = () => {
    const [token, setToken, user] = useContext(store);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const handleLogout = () => {
        setToken(null); // This will clear localStorage too
        setIsMenuOpen(false);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar">
            <div className="container">
                <div className="flex justify-between items-center w-full py-3">
                    {/* Brand */}
                    <Link className="navbar-brand animate-slideIn" to="/">
                        SecureAuth
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {!token ? (
                            <>
                                <div className="flex items-center gap-6">
                                    <Link
                                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Link
                                        to="/login"
                                        className="nav-link"
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="btn btn-primary btn-sm"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)',
                                            border: 'none',
                                            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)',
                                            fontWeight: '600'
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center gap-6">
                                    <Link
                                        className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                        to="/"
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        className={`nav-link ${isActive('/myprofile') ? 'active' : ''}`}
                                        to="/myprofile"
                                    >
                                        Profile
                                    </Link>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-primary-50 to-accent-50 rounded-full border border-primary-200">
                                        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="text-sm font-medium text-neutral-700">
                                            {user?.username}
                                        </span>
                                    </div>
                                    <button
                                        className="btn btn-secondary btn-sm"
                                        onClick={handleLogout}
                                        style={{
                                            background: 'linear-gradient(135deg, var(--neutral-100) 0%, var(--neutral-200) 100%)',
                                            border: '1px solid var(--neutral-300)',
                                            color: 'var(--neutral-700)',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-3 rounded-xl hover:bg-gradient-to-r hover:from-primary-50 hover:to-accent-50 transition-all duration-300 border border-transparent hover:border-primary-200"
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                        style={{
                            background: isMenuOpen ? 'linear-gradient(135deg, var(--primary-50) 0%, var(--accent-50) 100%)' : 'transparent'
                        }}
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span className={`block w-5 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'}`}></span>
                            <span className={`block w-5 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`block w-5 h-0.5 bg-gradient-to-r from-primary-600 to-accent-600 transition-all duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`md:hidden transition-all duration-500 overflow-hidden ${isMenuOpen ? 'max-h-96 pb-6' : 'max-h-0'}`}>
                    <div className="flex flex-col gap-3 pt-6 border-t border-gradient-to-r from-primary-200 to-accent-200" style={{
                        borderImage: 'linear-gradient(90deg, var(--primary-200), var(--accent-200)) 1'
                    }}>
                        {!token ? (
                            <>
                                <Link
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🏠 Home
                                </Link>
                                <Link
                                    className={`nav-link ${isActive('/register') ? 'active' : ''}`}
                                    to="/register"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    ✨ Register
                                </Link>
                                <Link
                                    className={`nav-link ${isActive('/login') ? 'active' : ''}`}
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🔑 Sign In
                                </Link>
                                <div className="mt-4">
                                    <Link
                                        to="/register"
                                        className="btn btn-primary w-full"
                                        onClick={() => setIsMenuOpen(false)}
                                        style={{
                                            background: 'linear-gradient(135deg, var(--primary-500) 0%, var(--accent-500) 100%)',
                                            border: 'none',
                                            boxShadow: '0 4px 15px rgba(14, 165, 233, 0.3)'
                                        }}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link
                                    className={`nav-link ${isActive('/') ? 'active' : ''}`}
                                    to="/"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    🏠 Home
                                </Link>
                                <Link
                                    className={`nav-link ${isActive('/myprofile') ? 'active' : ''}`}
                                    to="/myprofile"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    👤 Profile
                                </Link>
                                <div className="pt-4 border-t border-neutral-200 mt-4">
                                    <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-primary-50 to-accent-50 rounded-xl border border-primary-200">
                                        <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-semibold">
                                            {user?.username?.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-neutral-800">{user?.username}</p>
                                            <p className="text-xs text-neutral-600">Welcome back!</p>
                                        </div>
                                    </div>
                                    <button
                                        className="btn btn-secondary w-full"
                                        onClick={handleLogout}
                                        style={{
                                            background: 'linear-gradient(135deg, var(--neutral-100) 0%, var(--neutral-200) 100%)',
                                            border: '1px solid var(--neutral-300)',
                                            color: 'var(--neutral-700)'
                                        }}
                                    >
                                        🚪 Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
