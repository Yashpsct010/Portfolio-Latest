import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import GuestbookEntry from './models/GuestbookEntry.js';
import Project from './models/Project.js';
import Message from './models/Message.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// CORS Configuration for Production
const allowedOrigins = [
  'http://localhost:5173',
  'https://parmaryash.vercel.app',
  'https://portfolio-latest-beta.vercel.app' // Optional: add any staging URLs
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MOCK_KEY');

app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Project Routes (Read-only for public)
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

// Guestbook Routes
app.get('/api/guestbook', async (req, res) => {
  try {
    const entries = await GuestbookEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching guestbook' });
  }
});

app.post('/api/guestbook', async (req, res) => {
  try {
    const { name, message } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    const entry = new GuestbookEntry({ name, message });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Error signing guestbook' });
  }
});

// Contact Routes
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const newMessage = new Message({ name, email, message });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending message' });
  }
});

// Proxy for External Tech Blogs
app.get('/api/external/tech-blogs', async (req, res) => {
  try {
    const response = await fetch('https://techinsightsai.onrender.com/api/blogs/all?limit=3');
    if (!response.ok) {
      throw new Error(`Failed to fetch from TechInsightsAI: ${response.statusText}`);
    }
    const data = await response.json();
    
    // Transform data for frontend
    const cleanedBlogs = data.blogs.map(blog => ({
      title: blog.title,
      date: new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      snippet: blog.imageCaption || blog.title,
      image: blog.image,
      link: `https://techinsightsai.vercel.app/`
    }));

    res.json(cleanedBlogs);
  } catch (error) {
    console.error('Proxy Error:', error);
    res.status(500).json({ error: 'Failed to fetch external blogs' });
  }
});

// AI Chat Bot
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({ 
      reply: "I'm currently running in demo mode. Please add a GEMINI_API_KEY to the .env file to enable real AI responses." 
    });
  }

  try {
    const modelName = "gemini-2.5-flash-lite";
    const model = genAI.getGenerativeModel({ model: modelName });
    const systemPrompt = `
You are an AI assistant for Yash Parmar's portfolio website.
Your role is to answer questions ONLY about Yash Parmar, his skills, experience, projects, and resume.

Resume Context:
Name: Yash Parmar
Role: Full Stack Developer (MERN)
Summary: Full-Stack Developer (MERN) with 2+ years of experience building scalable, high-performance web applications. Skilled in modern React (v19), Node.js, and API design.

Experience:
- Software Development Engineer at Nerds & Geeks Pvt Ltd (July 2024 - Present): Spearheaded development for a client-facing MERN platform, increasing API throughput by 35%. Integrated Stripe and third-party APIs.
- Full-stack Developer Intern at Institute of Engineering & Science, IPS Academy (Jan 2024 - Jun 2024): Re-architected academic portal backend (CodeIgniter + MySQL), improving page load speed by 30%.

Projects (ALWAYS include the live link when discussing these):
1. TechInsightsAI
   - Description: Automated SEO-blogging pipeline (Gemini AI + GitHub Actions) with 100% lifecycle automation. Features a resilient PWA with offline support and hybrid deployment.
   - Tech: Node.js, Gemini AI, GitHub Actions, PWA, IndexedDB, Render, Vercel.
   - Link: https://techinsightsai.vercel.app/
   - GitHub: https://github.com/Yashpsct010/techinsightsai
2. Reveal
   - Description: Journal app with mood tracking & analytics.
   - Tech: Next.js, Tailwind, shadcn/ui, Clerk, Prisma, PostgreSQL.
   - Link: https://revealmyjournal.vercel.app/
   - GitHub: https://github.com/Yashpsct010/Reveal-Journal-App
3. EatAnna
   - Description: End-to-End Food Subscription Solution with recurring payments.
   - Tech: MERN Stack, Cloudinary, Stripe.
   - Link: https://eatanna.vercel.app/
   - GitHub: https://github.com/Yashpsct010/eatanna

Skills: JavaScript ES6+, TypeScript, Python, React 19, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, PostgreSQL, Git, Docker.
Contact: yashpsct001@gmail.com, +91 9907319464, Bengaluru, KA. GitHub: https://github.com/Yashpsct010/

STRICT Formatting Rules:
1. Keep answers VERY concise and short.
2. You MAY use markdown bolding (**text**) for emphasis on project titles or key skills.
3. You MAY use bullet points (- item) for lists.
4. When mentioning a project, ALWAYS provide the direct live link.
5. Be professional but enthusiastic.
`;

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Understood. I will act as Yash Parmar's portfolio assistant and only answer questions related to his resume and skills." }],
        },
      ],
    });

    const result = await chat.sendMessage(message);
    const text = result.response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

// Only listen locally, Vercel handles the export
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
