import { useEffect, useState } from 'react';

import API from '../api';

import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

import '../styles/dashboard.css';

function Dashboard() {
    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks');

            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const completedTasks = tasks.filter(
        (task) => task.status === 'Completed'
    ).length;

    const pendingTasks = tasks.filter(
        (task) => task.status === 'Pending'
    ).length;

    const progressTasks = tasks.filter(
        (task) => task.status === 'In Progress'
    ).length;

    return (
        <>
            <Navbar />

            <div className='dashboard-container'>
                <div className='dashboard-header'>
                    <div>
                        <h1>Dashboard</h1>

                        <p className='welcome-text'>
                            Welcome {user?.name} ({user?.role})
                        </p>
                    </div>
                </div>

                <div className='stats-grid'>
                    <div className='stat-card'>
                        <h2>{tasks.length}</h2>
                        <p>Total Tasks</p>
                    </div>

                    <div className='stat-card'>
                        <h2>{completedTasks}</h2>
                        <p>Completed</p>
                    </div>

                    <div className='stat-card'>
                        <h2>{pendingTasks}</h2>
                        <p>Pending</p>
                    </div>

                    <div className='stat-card'>
                        <h2>{progressTasks}</h2>
                        <p>In Progress</p>
                    </div>
                </div>

                <h2 className='task-heading'>Your Tasks</h2>

                <div className='task-grid'>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard key={task._id} task={task} />
                        ))
                    ) : (
                        <p>No tasks available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Dashboard;