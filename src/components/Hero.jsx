import { motion } from 'framer-motion';
import TerminalWindow from './TerminalWindow';

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-background">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{
                    backgroundImage: 'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                }}
            />

            <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Typography & CTAs */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-left"
                    >
                        <div className="inline-block px-3 py-1 mb-4 text-xs font-mono font-bold tracking-widest text-primary border border-primary rounded-full bg-primary/10">
                            SYSTEM_ONLINE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tighter mb-6 text-black dark:text-white leading-tight">
                            BUILDING <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                                DIGITAL REALITIES
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                            Full-stack developer crafting high-performance web experiences with modern architecture and pixel-perfect design.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <a href="#projects" className="neo-button group flex items-center gap-2">
                                VIEW PROJECTS
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </a>
                            <a href="#contact" className="px-8 py-3 bg-transparent border-2 border-border text-[var(--text-main)] font-bold hover:bg-surface transition-colors">
                                CONTACT ME
                            </a>
                        </div>
                    </motion.div>

                    {/* Right Column: Terminal */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative"
                    >
                        {/* Decorative elements behind terminal */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-xl opacity-50 rounded-lg -z-10" />
                        <TerminalWindow />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
