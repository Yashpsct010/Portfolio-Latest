import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { HERO_CONTENT } from '../constants';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const links = [
        { name: 'Home', href: '#home' },
        { name: 'About', href: '#about' },
        { name: 'Projects', href: '#projects' },
        { name: 'Experience', href: '#experience' },
        { name: 'Contact', href: '#contact' },
    ];

    const toggleMenu = () => setIsOpen(!isOpen);

    return (
        <nav className="fixed w-full z-50 top-0 left-0 transition-all duration-300 bg-background/80 backdrop-blur-md border-b-2 border-neoborder">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <motion.a
                    href="#home"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                >
                    <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
                    <span className="text-xl font-bold font-heading tracking-tighter text-primary hidden sm:block">
                        {HERO_CONTENT.name.split(' ')[0]}
                    </span>
                </motion.a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {links.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="text-sm font-bold text-black dark:text-white hover:text-primary transition-colors uppercase tracking-wider"
                        >
                            {link.name}
                        </motion.a>
                    ))}

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border-2 border-neoborder hover:bg-surface transition-colors"
                    >
                        {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary" />}
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full border-2 border-neoborder hover:bg-surface transition-colors"
                    >
                        {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-primary" />}
                    </button>
                    <button onClick={toggleMenu} className="text-black dark:text-white hover:text-primary">
                        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b-2 border-neoborder overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-lg font-bold text-black dark:text-white hover:text-primary uppercase tracking-wider"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;
