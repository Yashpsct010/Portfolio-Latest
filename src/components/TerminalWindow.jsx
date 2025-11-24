import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../constants';

const TerminalWindow = () => {
    const [lines, setLines] = useState([]);
    const [input, setInput] = useState('');
    const [isTypingIntro, setIsTypingIntro] = useState(true);
    const scrollRef = useRef(null);
    const inputRef = useRef(null);

    const introText = `> Initializing user profile...\n> Loading ${HERO_CONTENT.name}...\n> Role: ${HERO_CONTENT.role}\n> Status: Online\n\n${HERO_CONTENT.description}\n\nType 'help' to see available commands.`;

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setLines((prev) => {
                const newLines = introText.slice(0, index).split('\n');
                return newLines;
            });
            index++;
            if (index > introText.length) {
                clearInterval(interval);
                setIsTypingIntro(false);
            }
            scrollToBottom();
        }, 20);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [lines]);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleCommand = (cmd) => {
        const command = cmd.trim().toLowerCase();
        const newLines = [...lines, `user@portfolio:~$ ${cmd}`];

        switch (command) {
            case 'help':
                newLines.push(
                    'Available commands:',
                    '  projects  - View my work',
                    '  contact   - Get in touch',
                    '  about     - Learn more about me',
                    '  clear     - Clear the terminal',
                    '  help      - Show this help message'
                );
                break;
            case 'projects':
                newLines.push('Navigating to Projects section...');
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'contact':
                newLines.push('Opening communication channels...');
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'about':
                newLines.push('Navigating to About section...');
                document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                break;
            case 'clear':
                setLines([]);
                setInput('');
                return; // Special case to avoid adding empty line
            case '':
                break;
            default:
                newLines.push(`Command not found: ${command}. Type 'help' for list.`);
        }

        setLines(newLines);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleCommand(input);
        }
    };

    // Focus input when clicking anywhere in the terminal
    const handleTerminalClick = () => {
        if (!isTypingIntro && inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-3xl mx-auto bg-[#1a1b26] rounded-lg overflow-hidden shadow-neo border-2 border-border font-mono text-left flex flex-col h-[400px]"
            onClick={handleTerminalClick}
        >
            {/* Terminal Header */}
            <div className="bg-[#24283b] px-4 py-2 flex items-center gap-2 border-b-2 border-border shrink-0">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <div className="ml-4 text-xs text-gray-400 flex-1 text-center font-bold">
                    user@portfolio:~
                </div>
            </div>

            {/* Terminal Body */}
            <div
                ref={scrollRef}
                className="p-6 flex-1 overflow-y-auto text-green-400 text-sm md:text-base leading-relaxed cursor-text"
            >
                {lines.map((line, i) => (
                    <div key={i} className="whitespace-pre-wrap min-h-[1.5em]">{line}</div>
                ))}

                {!isTypingIntro && (
                    <div className="flex items-center">
                        <span className="mr-2 text-blue-400">user@portfolio:~$</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="bg-transparent border-none outline-none text-green-400 flex-1 font-mono"
                            autoFocus
                            spellCheck="false"
                            autoComplete="off"
                        />
                    </div>
                )}
                {isTypingIntro && <span className="animate-pulse">_</span>}
            </div>
        </motion.div>
    );
};

export default TerminalWindow;
