import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onComplete }) => {
    const [text, setText] = useState("Initializing...");

    const messages = [
        "Compiling awesomeness...",
        "Injecting caffeine...",
        "Loading Yash's brain...",
        "Starting the engines...",
        "Almost there..."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setText(messages[Math.floor(Math.random() * messages.length)]);
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <motion.div
                className="relative w-24 h-24 mb-8"
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            >
                <img src="/logo.svg" alt="Logo" className="w-full h-full drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
            </motion.div>

            <motion.div
                className="h-8 overflow-hidden"
            >
                <motion.p
                    key={text}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-xl font-bold font-heading text-primary tracking-wider"
                >
                    {text}
                </motion.p>
            </motion.div>

            <motion.div
                className="absolute bottom-10 w-64 h-1 bg-surface rounded-full overflow-hidden"
            >
                <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                />
            </motion.div>
        </motion.div>
    );
};

export default LoadingScreen;
