const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// About me information for the AI assistant
const aboutMe = `My name is Bara' Al Omari. I'm a 21-year-old Software Engineer from Jordan, currently residing in Doha, Qatar.

Technical Skills:
- Programming: Java, Python, JavaScript, TypeScript, C#, HTML5, CSS3, Node.js, React, Tailwind, PHP, Bootstrap
- Data & Cloud: MySQL, MongoDB, Azure, Oracle, Docker
- Design & Tools: Figma, Notion, GitHub, Linux, DevOps, CI/CD
- Languages: Arabic (native), English (fluent)

Expertise Areas:
- Software & Web Development
- UI/UX Design  
- Cloud & DevOps
- AI & Machine Learning
- Network Security
- Cybersecurity Fundamentals

Education: BS Information Systems graduate from University of Doha for Science & Technology

Certifications:
- Oracle Cloud Infrastructure Foundations Associate (July 2025)
- Network Security Fundamentals (Palo Alto Networks, April 2024)
- Cybersecurity Foundation (Palo Alto Networks, February 2024)

Featured Projects:
1. University Course Management Platform - Full-stack web application using JavaScript, Express.js, Node.js, MongoDB, Handlebars, CoreUI
2. Library Management Desktop Application - Java-based application with JavaFX, MySQL, implementing STRIDE, DREAD, OWASP security measures
3. Student Self-Assessment Web Application - Flask application with OpenAI API integration, Bootstrap, MongoDB

Contact Information:
- Email: baraalomari16@gmail.com
- GitHub: https://github.com/BaraAlOmari
- LinkedIn: https://www.linkedin.com/in/bara-al-omari-128826374/

Personal Qualities: Detail-oriented, fast learner, excellent communication and analytical skills, problem-solving focused, strategic thinking.

Industry Knowledge: Network Security, Cloud Computing, OCI, DevOps, UI/UX Design, Web Development, Agile methodologies, Database Management Systems (DBMS), Data Structures & Algorithms, Software Analysis & Design, Software Deployment, Application Security, OWASP, OOP, Web Server Management, Human Computer Interaction, Front-end/Back-end development, Networking, Cybersecurity Fundamentals, Computer Hardware.`;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Serve static files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create chat completion with OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant for Bara' Al Omari's portfolio website. 
          Answer questions about Bara' based on the following information: ${aboutMe}
          
          Guidelines:
          - Keep responses conversational and professional
          - Be enthusiastic about Bara's skills and projects
          - If asked about something not covered in the context, politely redirect to available information
          - Encourage visitors to reach out via email or LinkedIn for more details
          - Keep responses concise but informative (max 150 words)
          - Use a friendly, approachable tone`
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message.content;

    res.json({ 
      success: true, 
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    // Handle different types of errors
    if (error.code === 'insufficient_quota') {
      res.status(429).json({ 
        error: 'AI service temporarily unavailable. Please try again later.',
        type: 'quota_exceeded'
      });
    } else if (error.code === 'invalid_api_key') {
      res.status(401).json({ 
        error: 'AI service configuration error.',
        type: 'auth_error'
      });
    } else {
      res.status(500).json({ 
        error: 'Sorry, I\'m having trouble processing your request. Please try again.',
        type: 'general_error'
      });
    }
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    openai_configured: !!process.env.OPENAI_API_KEY
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📁 Serving static files from: ${__dirname}`);
  console.log(`🤖 OpenAI API configured: ${!!process.env.OPENAI_API_KEY}`);
});