import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        description: '',
        technologies: '',
        link: '',
        image: ''
    });
    const [isEditing, setIsEditing] = useState(null);

    useEffect(() => {
        if (token) {
            fetchProjects();
        }
    }, [token]);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            setToken(res.data.token);
            localStorage.setItem('token', res.data.token);
        } catch (error) {
            alert('Invalid credentials');
        }
    };

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const projectData = { ...formData, technologies: formData.technologies.split(',').map(t => t.trim()) };

        try {
            if (isEditing) {
                await axios.put(`/api/projects/${isEditing}`, projectData, config);
            } else {
                await axios.post('/api/projects', projectData, config);
            }
            setFormData({ title: '', subtitle: '', description: '', technologies: '', link: '', image: '' });
            setIsEditing(null);
            fetchProjects();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`/api/projects/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchProjects();
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const handleEdit = (project) => {
        setFormData({
            ...project,
            technologies: project.technologies.join(', ')
        });
        setIsEditing(project._id);
    };

    if (!token) {
        return (
            <section className="min-h-screen flex items-center justify-center bg-surface">
                <form onSubmit={handleLogin} className="neo-box p-8 bg-background w-full max-w-md">
                    <h2 className="text-3xl font-bold mb-6 text-center">Admin Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="neo-input mb-4"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="neo-input mb-6"
                    />
                    <button type="submit" className="neo-button w-full">LOGIN</button>
                </form>
            </section>
        );
    }

    return (
        <section className="min-h-screen pt-24 pb-12 px-6 bg-surface">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-12">
                    <h2 className="text-4xl font-bold">Dashboard</h2>
                    <button onClick={handleLogout} className="text-red-500 font-bold hover:underline">LOGOUT</button>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-1">
                        <div className="neo-box p-6 bg-background sticky top-24">
                            <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="neo-input"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Subtitle"
                                    value={formData.subtitle}
                                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                                    className="neo-input"
                                />
                                <textarea
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="neo-input h-32"
                                    required
                                />
                                <input
                                    type="text"
                                    placeholder="Technologies (comma separated)"
                                    value={formData.technologies}
                                    onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                                    className="neo-input"
                                />
                                <input
                                    type="text"
                                    placeholder="Link URL"
                                    value={formData.link}
                                    onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                                    className="neo-input"
                                />
                                <div className="flex gap-2">
                                    <button type="submit" className="neo-button flex-1">
                                        {isEditing ? 'UPDATE' : 'ADD'}
                                    </button>
                                    {isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => { setIsEditing(null); setFormData({ title: '', subtitle: '', description: '', technologies: '', link: '', image: '' }); }}
                                            className="px-4 py-2 border-2 border-border font-bold hover:bg-gray-200"
                                        >
                                            CANCEL
                                        </button>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* List */}
                    <div className="lg:col-span-2 space-y-6">
                        {projects.map((project) => (
                            <motion.div
                                key={project._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="neo-box p-6 bg-background flex justify-between items-start"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold">{project.title}</h3>
                                    <p className="text-gray-500 mb-2">{project.subtitle}</p>
                                    <p className="mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech, i) => (
                                            <span key={i} className="px-2 py-1 bg-surface border border-border text-xs font-bold">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        onClick={() => handleEdit(project)}
                                        className="px-3 py-1 bg-yellow-300 border-2 border-border font-bold text-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => handleDelete(project._id)}
                                        className="px-3 py-1 bg-red-400 border-2 border-border font-bold text-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminDashboard;
