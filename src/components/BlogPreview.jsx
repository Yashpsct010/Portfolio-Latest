import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80";

const BlogPreview = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch('/api/external/tech-blogs');
                const data = await response.json();
                setBlogs(data);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    const BlogSkeleton = () => (
        <div className="neo-box bg-surface overflow-hidden group">
            <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse border-b-2 border-black dark:border-white" />
            <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 animate-pulse w-1/4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-800 animate-pulse w-3/4" />
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 animate-pulse w-full" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 animate-pulse w-5/6" />
                </div>
            </div>
        </div>
    );

    return (
        <section id="blog" className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4 text-black dark:text-white uppercase tracking-tighter">
                            Latest <br />
                            <span className="text-primary italic">Insights</span>
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 max-w-md">
                            Direct from <span className="font-bold text-black dark:text-white">TechInsightsAI</span>: Automated research and generated analysis on the bleeding edge of tech.
                        </p>
                    </motion.div>
                    
                    <motion.a
                        href="https://techinsightsai.vercel.app/"
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="neo-button flex items-center gap-2 group"
                    >
                        EXPLORE PLATFORM
                        <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </motion.a>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {loading ? (
                        [...Array(3)].map((_, i) => <BlogSkeleton key={i} />)
                    ) : (
                        blogs.map((post, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="neo-box bg-surface overflow-hidden group flex flex-col h-full"
                            >
                                <div className="h-48 overflow-hidden relative border-b-2 border-black dark:border-white">
                                    <img 
                                        src={post.image} 
                                        alt={post.title} 
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = FALLBACK_IMAGE;
                                        }}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <div className="p-6 flex flex-col flex-grow">
                                    <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
                                        {post.date}
                                    </span>
                                    <h3 className="text-xl font-bold mb-3 text-black dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                                        {post.snippet}
                                    </p>
                                    <div className="mt-auto">
                                        <a 
                                            href={post.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-black dark:text-white hover:text-primary transition-colors border-b-2 border-black dark:border-white hover:border-primary pb-1"
                                        >
                                            READ FULL POST
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default BlogPreview;
