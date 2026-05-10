import { useEffect, useState } from 'react';

import API from '../api';

import Navbar from '../components/Navbar';

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
            alert(error.response.data.message);
        }
    };

    const updateStatus = async (taskId, status) => {
        try {
            await API.put(`/tasks/${taskId}`, {
                status
            });

            fetchTasks();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <Navbar />

            <div className='project-container'>
                <h1>Task Management</h1>

                {user.role === 'Admin' && (
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
                                    (user) =>
                                        user.role === 'Member'
                                )
                                .map((user) => (
                                    <option
                                        key={user._id}
                                        value={user._id}
                                    >
                                        {user.name}
                                    </option>
                                ))}
                        </select>

                        <button type='submit'>
                            Assign Task
                        </button>
                    </form>
                )}

                <div className='task-grid'>
                    {tasks.map((task) => (
                        <div
                            className='task-card'
                            key={task._id}
                        >
                            <h3>{task.title}</h3>

                            <p>{task.description}</p>

                            <p>
                                <strong>Project:</strong>{' '}
                                {task.project?.title}
                            </p>

                            <p>
                                <strong>Assigned To:</strong>{' '}
                                {task.assignedTo?.name}
                            </p>

                            <div className='task-status-section'>
                                <p>
                                    <strong>Status:</strong>
                                </p>

                                <div className='status-buttons'>
                                    <button
                                        className={
                                            task.status ===
                                                'Pending'
                                                ? 'pending-btn active-pending'
                                                : 'pending-btn'
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                task._id,
                                                'Pending'
                                            )
                                        }
                                    >
                                        Pending
                                    </button>

                                    <button
                                        className={
                                            task.status ===
                                                'In Progress'
                                                ? 'progress-btn active-progress'
                                                : 'progress-btn'
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                task._id,
                                                'In Progress'
                                            )
                                        }
                                    >
                                        In Progress
                                    </button>

                                    <button
                                        className={
                                            task.status ===
                                                'Completed'
                                                ? 'completed-btn active-completed'
                                                : 'completed-btn'
                                        }
                                        onClick={() =>
                                            updateStatus(
                                                task._id,
                                                'Completed'
                                            )
                                        }
                                    >
                                        Completed
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Tasks;