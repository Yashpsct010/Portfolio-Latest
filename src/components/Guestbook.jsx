import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const Guestbook = () => {
    const [entries, setEntries] = useState([]);
    const [formData, setFormData] = useState({ name: '', message: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchEntries();
    }, []);

    const fetchEntries = async () => {
        try {
            const res = await axios.get('/api/guestbook');
            setEntries(res.data);
        } catch (error) {
            console.error('Error fetching guestbook:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.message) return;

        setLoading(true);
        try {
            await axios.post('/api/guestbook', formData);
            setFormData({ name: '', message: '' });
            fetchEntries();
        } catch (error) {
            console.error('Error signing guestbook:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section id="guestbook" className="py-20 bg-surface border-t-2 border-neoborder">
            <div className="max-w-4xl mx-auto px-6">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl md:text-6xl font-bold font-heading mb-12 text-center uppercase tracking-tighter text-black dark:text-white"
                >
                    Guestbook
                </motion.h2>

                <div className="grid md:grid-cols-2 gap-12">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="neo-box p-8 bg-background"
                    >
                        <h3 className="text-2xl font-bold mb-6 text-black dark:text-white">Sign the Guestbook</h3>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-bold mb-2 text-black dark:text-white">Name</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="neo-input text-black dark:text-white"
                                    placeholder="Your Name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-bold mb-2 text-black dark:text-white">Message</label>
                                <textarea
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="neo-input h-32 resize-none text-black dark:text-white"
                                    placeholder="Leave a message..."
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="neo-button w-full disabled:opacity-50"
                            >
                                {loading ? 'Signing...' : 'SIGN NOW'}
                            </button>
                        </form>
                    </motion.div>

                    {/* Entries List */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="space-y-6 max-h-[600px] overflow-y-auto pr-4 custom-scrollbar"
                    >
                        {entries.length === 0 ? (
                            <p className="text-center text-gray-500 italic">Be the first to sign!</p>
                        ) : (
                            entries.map((entry) => (
                                <div key={entry._id} className="neo-box p-6 bg-background">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-lg text-black dark:text-white">{entry.name}</h4>
                                        <span className="text-xs text-gray-500">
                                            {new Date(entry.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300">{entry.message}</p>
                                </div>
                            ))
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Guestbook;
