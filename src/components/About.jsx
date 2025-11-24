import { motion } from 'framer-motion';
import { ABOUT_CONTENT, EXPERIENCES, SKILLS } from '../constants';

const About = () => {
    return (
        <section id="about" className="py-20 relative">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8 text-center text-black dark:text-white">
                        About Me
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center leading-relaxed">
                        {ABOUT_CONTENT.summary}
                    </p>
                </motion.div>

                {/* Skills */}
                <div className="mb-20">
                    <h3 className="text-2xl font-bold font-heading mb-8 text-center text-black dark:text-white">Technical Skills</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {SKILLS.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="px-4 py-2 bg-surface border border-neoborder rounded-full text-sm text-gray-700 dark:text-gray-300 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Experience Timeline */}
                <div id="experience" className="relative">
                    <h3 className="text-2xl font-bold font-heading mb-12 text-center text-black dark:text-white">Experience</h3>
                    <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-neoborder">
                        {EXPERIENCES.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                            >
                                {/* Icon/Dot */}
                                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-neoborder bg-background shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                                    <div className="w-3 h-3 bg-primary rounded-full" />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-surface p-6 rounded-2xl border border-neoborder hover:border-primary/30 transition-colors shadow-lg">
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                        <h4 className="font-bold text-lg text-black dark:text-white">{exp.role}</h4>
                                        <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                                            {exp.year}
                                        </span>
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-4">{exp.company}</div>
                                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                                        {exp.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech) => (
                                            <span key={tech} className="text-xs text-gray-600 dark:text-gray-500 bg-gray-200 dark:bg-white/5 px-2 py-1 rounded">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
