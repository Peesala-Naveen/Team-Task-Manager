import { useState } from 'react';
import { Link } from 'react-router-dom';

import API from '../api';

import '../styles/auth.css';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/auth/login', formData);

            localStorage.setItem('token', res.data.token);

            localStorage.setItem('user', JSON.stringify(res.data.user));

            alert('Login Successful');

            window.location.href = '/dashboard';
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <i className='fa-solid fa-list-check' style={{ fontSize: '2.5rem', color: '#6366f1', marginBottom: '12px' }}></i>
                    <h1>Welcome Back</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>Sign in to manage your team projects and tasks</p>
                </div>

                <div className='input-group'>
                    <input
                        type='email'
                        name='email'
                        placeholder='Enter Email (e.g. admin@example.com)'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className='input-group'>
                    <input
                        type='password'
                        name='password'
                        placeholder='Enter Password'
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type='submit'>Sign In</button>

                <p>
                    Don't have an account? <Link to='/signup'>Create Account</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;