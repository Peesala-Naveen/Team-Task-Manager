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
                <h1>Login</h1>

                <input
                    type='email'
                    name='email'
                    placeholder='Enter Email'
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Enter Password'
                    onChange={handleChange}
                    required
                />

                <button type='submit'>Login</button>

                <p>
                    Don't have an account? <Link to='/signup'>Signup</Link>
                </p>
            </form>
        </div>
    );
}

export default Login;