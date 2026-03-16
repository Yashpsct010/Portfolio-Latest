import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { PROJECTS } from '../constants';
import { FiExternalLink, FiGithub } from 'react-icons/fi';

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
                            key={project._id || index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                            viewport={{ once: true }}
                            className="neo-box overflow-hidden bg-background h-full flex flex-col group"
                        >
                            {/* Project Image */}
                            {project.image && (
                                <div className="h-48 overflow-hidden border-b-2 border-black dark:border-white relative">
                                    <img 
                                        src={project.image} 
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                            )}
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

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2 mb-6">
                                    {project.technologies?.map((tech, i) => (
                                        <span 
                                            key={i} 
                                            className="px-2 py-1 text-[10px] font-mono font-bold bg-primary/10 text-primary border border-primary/20 rounded"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-wrap gap-4 mt-auto">
                                    {project.link && (
                                        <a 
                                            href={project.link} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-primary transition-colors border-b-2 border-black dark:border-white hover:border-primary pb-1"
                                        >
                                            View in Action! <FiExternalLink className="text-lg" />
                                        </a>
                                    )}
                                    {project.githubLink && (
                                        <a 
                                            href={project.githubLink} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-primary transition-colors border-b-2 border-black dark:border-white hover:border-primary pb-1"
                                        >
                                            Source Code <FiGithub className="text-lg" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
