# Bara' Al Omari - Portfolio Website with AI Assistant

A modern, responsive portfolio website featuring an AI-powered chatbot assistant built with OpenAI's GPT-4o-mini API.

## 🚀 Features

- **Modern Portfolio Design**: Clean, professional layout with dark/light theme support
- **AI-Powered Chat Assistant**: Interactive chatbot that can answer questions about Bara's background, skills, and experience
- **Responsive Design**: Optimized for all devices using Tailwind CSS
- **Real-time Chat Interface**: Smooth chat experience with typing indicators and timestamps
- **Professional Theme**: Violet/purple color scheme with smooth animations

## 🛠️ Technologies Used

### Frontend
- HTML5, CSS3, JavaScript (ES6+)
- Tailwind CSS for styling
- Font Awesome icons
- Responsive design principles

### Backend
- Node.js with Express.js
- OpenAI API (GPT-4o-mini)
- CORS middleware
- Environment variables with dotenv

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (v14 or higher) installed
- An OpenAI API key
- Git (for cloning the repository)

## ⚡ Quick Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd my-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your OpenAI API key:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_actual_openai_api_key_here

# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
FRONTEND_URL=http://localhost:3000
```

**Important**: Replace `your_actual_openai_api_key_here` with your actual OpenAI API key from [OpenAI Platform](https://platform.openai.com/).

### 4. Start the Development Server
```bash
npm run dev
```

The server will start at `http://localhost:3000`

## 🔧 Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with nodemon (auto-restart)
- `npm run build` - Build Tailwind CSS (watch mode)

## 🤖 AI Assistant Features

The AI assistant can help visitors learn about:

- **Technical Skills**: Programming languages, frameworks, and tools
- **Professional Experience**: Work history and expertise areas
- **Education & Certifications**: Academic background and professional certifications
- **Projects**: Featured projects with technical details
- **Contact Information**: How to get in touch
- **Personal Qualities**: Professional attributes and soft skills

### Chat Widget Functionality

- **Toggle Chat**: Click the floating robot button to open/close the chat
- **Real-time Responses**: Get instant AI-powered responses
- **Typing Indicators**: Visual feedback during response generation
- **Error Handling**: Graceful error messages for API issues
- **Responsive Design**: Works seamlessly on all devices
- **Theme Support**: Adapts to light/dark theme preferences

## 🔐 Security & Best Practices

- Environment variables for sensitive data
- CORS configuration for secure API access
- Input validation and error handling
- Rate limiting considerations (implement as needed)
- Secure API key management

## 🎨 Customization

### Modifying AI Responses
Edit the `aboutMe` constant in `server.js` to update the information the AI assistant uses.

### Styling the Chat Widget
The chat widget uses Tailwind CSS classes. Modify the HTML classes in `index.html` and the JavaScript styling in `js/main.js`.

### Changing the AI Model
In `server.js`, you can change the OpenAI model by modifying the `model` parameter in the chat completion request.

## 📱 Mobile Responsiveness

The chat widget is fully responsive:
- Adapts to different screen sizes
- Touch-friendly interface
- Optimized for mobile interactions
- Maintains functionality across devices

## 🐛 Troubleshooting

### Common Issues

1. **Chat not working**: Check if your OpenAI API key is correctly set in the `.env` file
2. **Server won't start**: Make sure all dependencies are installed with `npm install`
3. **API errors**: Verify your OpenAI API key has sufficient credits and permissions
4. **Styling issues**: Ensure Tailwind CSS is properly built

### Error Messages

- **"AI service temporarily unavailable"**: API quota exceeded
- **"AI service configuration error"**: Invalid API key
- **"Sorry, I'm having trouble connecting"**: Network or server issues

## 🚀 Deployment

### Environment Setup
1. Set up your production environment variables
2. Ensure your OpenAI API key is configured
3. Install production dependencies

### Build Process
```bash
npm install --production
npm start
```

## 📞 Contact & Support

If you encounter any issues or have questions:

- **Email**: baraalomari16@gmail.com
- **GitHub**: [BaraAlOmari](https://github.com/BaraAlOmari)
- **LinkedIn**: [Bara Al Omari](https://www.linkedin.com/in/bara-al-omari-128826374/)

## 📄 License

This project is licensed under the ISC License. See the LICENSE file for details.

## 🙏 Acknowledgments

- OpenAI for providing the GPT-4o-mini API
- Tailwind CSS for the styling framework
- Font Awesome for the icons
- The open-source community for inspiration and tools

---

**Note**: Remember to keep your OpenAI API key secure and never commit it to version control. Always use environment variables for sensitive information.
