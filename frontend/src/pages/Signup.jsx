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
                <h1>Signup</h1>

                <input
                    type='text'
                    name='name'
                    placeholder='Enter Name'
                    onChange={handleChange}
                    required
                />

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

                <select name='role' onChange={handleChange}>
                    <option value='Member'>Member</option>
                    <option value='Admin'>Admin</option>
                </select>

                <button type='submit'>Signup</button>

                <p>
                    Already have an account? <Link to='/'>Login</Link>
                </p>
            </form>
        </div>
    );
}

export default Signup;