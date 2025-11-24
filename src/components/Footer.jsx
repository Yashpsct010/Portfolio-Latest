import { CONTACT } from '../constants';

const Footer = () => {
    return (
        <footer className="bg-surface py-8 border-t border-neoborder">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-gray-600 dark:text-gray-400 text-sm">
                    © {new Date().getFullYear()} {CONTACT.name}. All rights reserved.
                </div>
                <div className="flex space-x-6">
                    {CONTACT.links.map((link, index) => (
                        <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors text-xl"
                        >
                            <link.icon />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
