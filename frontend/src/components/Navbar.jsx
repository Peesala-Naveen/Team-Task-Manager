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
            <div className='navbar-brand'>
                <i className='fa-solid fa-list-check brand-icon'></i>
                <h2>TaskPulse</h2>
            </div>

            <div className='nav-links'>
                <Link to='/dashboard' className='nav-item'>
                    <i className='fa-solid fa-chart-pie'></i> Dashboard
                </Link>
                <Link to='/projects' className='nav-item'>
                    <i className='fa-solid fa-folder-open'></i> Projects
                </Link>
                <Link to='/tasks' className='nav-item'>
                    <i className='fa-solid fa-list-task'></i> Tasks
                </Link>
                {user && (
                    <span className={`user-badge ${user.role === 'Admin' ? 'role-admin' : 'role-member'}`}>
                        <i className={user.role === 'Admin' ? 'fa-solid fa-user-shield' : 'fa-solid fa-user-gear'}></i>
                        {user.name} <span>({user.role})</span>
                    </span>
                )}
                <button onClick={logout} className='logout-btn'>
                    <i className='fa-solid fa-right-from-bracket'></i> Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;