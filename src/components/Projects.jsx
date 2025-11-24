import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { PROJECTS } from '../constants';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                if (res.data.length > 0) {
                    setProjects(res.data);
                } else {
                    setProjects(PROJECTS); // Fallback to constants if DB is empty
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
                setProjects(PROJECTS); // Fallback on error
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-4xl md:text-6xl font-bold font-heading mb-16 text-center uppercase tracking-tighter text-black dark:text-white"
                >
                    Selected Works
                </motion.h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="neo-box bg-surface group"
                        >
                            <div className="p-6 flex flex-col h-full">
                                <div className="mb-4">
                                    <h3 className="text-2xl font-bold mb-1 text-black dark:text-white group-hover:text-primary transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">
                                        {project.subtitle}
                                    </p>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-6 flex-grow">
                                    {project.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
