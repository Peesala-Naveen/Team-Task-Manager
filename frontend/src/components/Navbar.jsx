import { Link } from 'react-router-dom';

import '../styles/navbar.css';

function Navbar() {
    const user = JSON.parse(localStorage.getItem('user'));

    const logout = () => {
        localStorage.clear();

        window.location.href = '/';
    };

    return (
        <nav className='navbar'>
            <h2>Team Task Manager</h2>

            <div className='nav-links'>
                <Link to='/dashboard'>Dashboard</Link>

                <Link to='/projects'>Projects</Link>

                {user?.role === 'Admin' && (
                    <Link to='/tasks'>Tasks</Link>
                )}

                <button onClick={logout}>Logout</button>
            </div>
        </nav>
    );
}

export default Navbar;