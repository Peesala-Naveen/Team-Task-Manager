import { useState } from 'react';
import { Link } from 'react-router-dom';

import API from '../api';

import '../styles/auth.css';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Member'
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
            await API.post('/auth/signup', formData);

            alert('Signup Successful');

            window.location.href = '/';
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <div className='auth-container'>
            <form className='auth-form' onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '8px' }}>
                    <i className='fa-solid fa-user-plus' style={{ fontSize: '2.5rem', color: '#6366f1', marginBottom: '12px' }}></i>
                    <h1>Create Account</h1>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>Join your team to collaborate on projects and tasks</p>
                </div>

                <input
                    type='text'
                    name='name'
                    placeholder='Full Name'
                    onChange={handleChange}
                    required
                />

                <input
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    onChange={handleChange}
                    required
                />

                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    required
                />

                <select name='role' onChange={handleChange}>
                    <option value='Member'>Member Role</option>
                    <option value='Admin'>Admin Role</option>
                </select>

                <button type='submit'>Register Account</button>

                <p>
                    Already have an account? <Link to='/'>Sign In</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;