import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import mongoose from 'mongoose';
import User from './models/User.js';
import GuestbookEntry from './models/GuestbookEntry.js';
import Project from './models/Project.js';
import { auth } from './middleware/auth.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

app.use(cors());
app.use(express.json());

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'MOCK_KEY');

app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Project Routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
});

app.post('/api/projects', auth, async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
});

app.put('/api/projects/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
});

app.delete('/api/projects/:id', auth, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
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
    const entry = new GuestbookEntry({ name, message });
    await entry.save();
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: 'Error signing guestbook' });
  }
});

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!process.env.GEMINI_API_KEY) {
    return res.json({ 
      reply: "I'm currently running in demo mode. Please add a GEMINI_API_KEY to the .env file to enable real AI responses." 
    });
  }

  try {
    const modelName = "gemini-2.0-flash";
    // console.log("Using Gemini Model:", modelName);
    const model = genAI.getGenerativeModel({ model: modelName });
    const systemPrompt = `
You are an AI assistant for Yash Parmar's portfolio website.
Your role is to answer questions ONLY about Yash Parmar, his skills, experience, projects, and resume.
If a user asks about anything else (e.g., general knowledge, coding help unrelated to Yash, weather, etc.), politely refuse and say you can only answer questions about Yash.

Here is Yash's Resume Context:
Name: Yash Parmar
Role: Full Stack Developer (MERN)
Summary: Full-Stack Developer (MERN) with 2+ years of experience building scalable, high-performance web applications. Skilled in modern React (v19), Node.js, and API design with expertise in database optimization and CI/CD automation. Improved backend efficiency by 40% through caching and query tuning.
Experience:
- Software Developer at Nerds & Geeks Pvt Ltd (March 2023 - Present): Spearheaded development for a client-facing MERN platform, increasing API throughput by 35%. Integrated Stripe and third-party APIs. Implemented caching (Redis) and indexing strategies.
- Full-stack Developer Intern at Institute of Engineering & Science, IPS Academy (Aug 2022 - Jan 2023): Re-architected academic portal backend (CodeIgniter + MySQL), improving page load speed by 30%. Automated grading workflows.
Projects:
- TechInsightsAI: AI-driven blogging platform (MERN, Vite, Gemini API). Automated workflows with GitHub Actions.
- Reveal: Journal app with mood tracking (Next.js, Tailwind, shadcn/ui, Clerk, Prisma, PostgreSQL).
- EatAnna: Food Subscription Solution (MERN, Cloudinary, Stripe).
Skills: JavaScript ES6+, TypeScript, Python, React 19, Next.js, Tailwind CSS, Node.js, Express.js, MongoDB, PostgreSQL, Git, Docker.
Contact: yashpsct001@gmail.com, +91 9907319464, Bengaluru, KA.

Formatting Rules:
- Use Markdown formatting (bold, bullet points) to make answers easy to read.
- Keep answers concise and professional.
- Be enthusiastic about Yash's work.
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
    const response = await result.response;
    const text = response.text();

    res.json({ reply: text });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});



if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
