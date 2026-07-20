import { useEffect, useState } from 'react';

import API from '../api';

import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';

import '../styles/project.css';
import '../styles/dashboard.css';

function Tasks() {
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);
    const [tasks, setTasks] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: 'Pending',
        dueDate: '',
        project: '',
        assignedTo: ''
    });

    useEffect(() => {
        fetchProjects();
        fetchUsers();
        fetchTasks();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await API.get('/projects');

            setProjects(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchUsers = async () => {
        try {
            const res = await API.get('/auth/users');

            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const fetchTasks = async () => {
        try {
            const res = await API.get('/tasks');

            setTasks(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await API.post('/tasks', formData);

            alert('Task Assigned Successfully');

            fetchTasks();

            setFormData({
                title: '',
                description: '',
                status: 'Pending',
                dueDate: '',
                project: '',
                assignedTo: ''
            });
        } catch (error) {
            alert(error.response?.data?.message || 'Error assigning task');
        }
    };

    const updateStatus = async (taskId, status) => {
        // Optimistic UI update
        setTasks((prevTasks) =>
            prevTasks.map((t) => (t._id === taskId ? { ...t, status } : t))
        );

        try {
            await API.put(`/tasks/${taskId}`, {
                status
            });

            fetchTasks();
        } catch (error) {
            console.error('Failed to update status:', error);
            alert('Failed to update task status. Please try again.');
            fetchTasks();
        }
    };

    return (
        <>
            <Navbar />

            <div className='project-container'>
                <h1>Task Management</h1>

                {user?.role === 'Admin' && (
                    <form className='project-form' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='title'
                            placeholder='Task Title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name='description'
                            placeholder='Task Description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type='date'
                            name='dueDate'
                            value={formData.dueDate}
                            onChange={handleChange}
                            required
                        />

                        <select
                            name='project'
                            value={formData.project}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>Select Project</option>

                            {projects.map((project) => (
                                <option
                                    key={project._id}
                                    value={project._id}
                                >
                                    {project.title}
                                </option>
                            ))}
                        </select>

                        <select
                            name='assignedTo'
                            value={formData.assignedTo}
                            onChange={handleChange}
                            required
                        >
                            <option value=''>
                                Assign Member
                            </option>

                            {users
                                .filter(
                                    (u) =>
                                        u.role === 'Member' || u.role === 'Admin'
                                )
                                .map((u) => (
                                    <option
                                        key={u._id}
                                        value={u._id}
                                    >
                                        {u.name} ({u.role})
                                    </option>
                                ))}
                        </select>

                        <button type='submit'>
                            Assign Task
                        </button>
                    </form>
                )}

                <div className='task-grid'>
                    {tasks.length > 0 ? (
                        tasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onStatusChange={updateStatus}
                            />
                        ))
                    ) : (
                        <p className='no-task-text'>No tasks available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default Tasks;