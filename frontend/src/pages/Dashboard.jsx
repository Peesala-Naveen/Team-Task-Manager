import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import '../styles/dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (!token || !user) {
            navigate('/');
            return;
        }
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await API.get('/tasks');
            setTasks(res.data || []);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
            if (err.response?.status === 401) {
                localStorage.clear();
                navigate('/');
            } else {
                setError('Failed to load dashboard tasks. Please check server connection.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            await API.put(`/tasks/${taskId}`, { status: newStatus });
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t._id === taskId ? { ...t, status: newStatus } : t))
            );
        } catch (err) {
            console.error('Failed to update task status:', err);
            alert('Failed to update task status');
        }
    };

    const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
    const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;
    const progressTasks = tasks.filter((t) => t.status === 'In Progress').length;

    const filteredTasks = tasks.filter((task) => {
        if (filterStatus === 'All') return true;
        return task.status === filterStatus;
    });

    return (
        <>
            <Navbar />

            <div className='dashboard-container'>
                <div className='dashboard-header'>
                    <div>
                        <h1>Project Dashboard</h1>
                        <p className='welcome-text'>
                            Welcome back, <strong>{user?.name || 'User'}</strong> ({user?.role || 'Member'})
                        </p>
                    </div>
                </div>

                <div className='stats-grid'>
                    <div 
                        className={`stat-card ${filterStatus === 'All' ? 'active-filter' : ''}`}
                        onClick={() => setFilterStatus('All')}
                    >
                        <h2>{tasks.length}</h2>
                        <p>Total Tasks</p>
                    </div>

                    <div 
                        className={`stat-card ${filterStatus === 'Completed' ? 'active-filter' : ''}`}
                        onClick={() => setFilterStatus('Completed')}
                    >
                        <h2>{completedTasks}</h2>
                        <p>Completed</p>
                    </div>

                    <div 
                        className={`stat-card ${filterStatus === 'Pending' ? 'active-filter' : ''}`}
                        onClick={() => setFilterStatus('Pending')}
                    >
                        <h2>{pendingTasks}</h2>
                        <p>Pending</p>
                    </div>

                    <div 
                        className={`stat-card ${filterStatus === 'In Progress' ? 'active-filter' : ''}`}
                        onClick={() => setFilterStatus('In Progress')}
                    >
                        <h2>{progressTasks}</h2>
                        <p>In Progress</p>
                    </div>
                </div>

                <div className='task-section-header'>
                    <h2 className='task-heading'>
                        {filterStatus === 'All' ? 'All Assigned Tasks' : `${filterStatus} Tasks`}
                    </h2>
                    
                    <div className='filter-tabs'>
                        {['All', 'Pending', 'In Progress', 'Completed'].map((status) => (
                            <button
                                key={status}
                                className={`filter-btn ${filterStatus === status ? 'active' : ''}`}
                                onClick={() => setFilterStatus(status)}
                            >
                                {status}
                            </button>
                        ))}
                    </div>
                </div>

                {loading ? (
                    <div className='loading-state'>Loading tasks...</div>
                ) : error ? (
                    <div className='error-state'>{error}</div>
                ) : (
                    <div className='task-grid'>
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => (
                                <TaskCard 
                                    key={task._id} 
                                    task={task} 
                                    onStatusChange={handleStatusChange} 
                                />
                            ))
                        ) : (
                            <div className='empty-state'>
                                <h3>No tasks found</h3>
                                <p>No tasks match the selected filter standard.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}

export default Dashboard;