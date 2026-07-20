import { useEffect, useState } from 'react';

import API from '../api';

import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';

import '../styles/project.css';

function Projects() {
    const [projects, setProjects] = useState([]);

    const user = JSON.parse(localStorage.getItem('user'));

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const res = await API.get('/projects');

            setProjects(res.data);
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
            await API.post('/projects', formData);

            alert('Project Created');

            fetchProjects();

            setFormData({
                title: '',
                description: ''
            });
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    return (
        <>
            <Navbar />

            <div className='project-container'>
                <h1>Projects</h1>

                {user?.role === 'Admin' && (
                    <form className='project-form' onSubmit={handleSubmit}>
                        <input
                            type='text'
                            name='title'
                            placeholder='Project Title'
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                        <textarea
                            name='description'
                            placeholder='Project Description'
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />

                        <button type='submit'>Create Project</button>
                    </form>
                )}

                <div className='project-grid'>
                    {projects.map((project) => (
                        <ProjectCard key={project._id} project={project} />
                    ))}
                </div>
            </div>
        </>
    );
}

export default Projects;