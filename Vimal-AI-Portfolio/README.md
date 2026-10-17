<p align="center">

<img src="https://img.shields.io/badge/Status-Active-success?style=for-the-badge"/>

<img src="https://img.shields.io/badge/Maintained-Yes-blue?style=for-the-badge"/>

<img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>

</p>
# 🤖 AI-Powered Portfolio Assistant using RAG and LLM

An intelligent AI chatbot integrated into my personal portfolio website that can answer questions about my skills, projects, experience, and background using Retrieval-Augmented Generation (RAG).

The system combines a React frontend, FastAPI backend, LangChain, ChromaDB vector database, and Groq LLM to provide accurate context-based responses from my personal portfolio data.

---

## 🚀 Live Demo

🌐 Portfolio Website:
https://vimal-ai-portfolio.vercel.app/

⚡ Backend API:
https://vimal-ai-portfolio.onrender.com

---

## 📌 Project Overview

Traditional portfolio websites only display static information. This project introduces an AI-powered assistant that allows visitors to interact with my portfolio through natural language conversations.

The chatbot retrieves relevant information from my portfolio knowledge base and generates meaningful responses using a Large Language Model.

---

## 🏗️ System Architecture


User
|
| Question
↓
React Portfolio Website
|
↓
FastAPI Backend
|
↓
LangChain RAG Pipeline
|
↓
ChromaDB Vector Database
|
↓
Groq LLM
|
↓
Generated Response


---

## ✨ Features

- 💬 AI chatbot integrated into portfolio website
- 🧠 Retrieval-Augmented Generation (RAG) based responses
- 📚 Knowledge retrieval from personal portfolio documents
- ⚡ Fast response generation using Groq LLM
- 🔍 Semantic search using vector embeddings
- 🌐 Fully deployed application
    - Frontend: Vercel
    - Backend: Render

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- Tailwind CSS

### Backend
- FastAPI
- Python

### AI / ML
- LangChain
- Groq LLM
- ChromaDB
- Vector Embeddings

### Deployment
- Vercel
- Render

---

## 🔄 How It Works

### 1. User Interaction

The user asks questions through the chatbot interface.

Example:

---

### 2. Query Processing

The question is sent from React frontend to the FastAPI backend.

---

### 3. Retrieval-Augmented Generation

The backend:

1. Converts the query into embeddings
2. Searches the ChromaDB vector database
3. Retrieves relevant portfolio information
4. Sends context to the LLM

---

### 4. Response Generation

The Groq LLM generates a natural language response based on the retrieved information.

---

## 📂 Project Structure
AI-Portfolio
│
├── frontend
│ ├── src
│ │ ├── App.jsx
│ │ └── Chatbot.jsx
│ ├── package.json
│
├── backend
│ ├── main.py
│ ├── rag.py
│ ├── rag
│ │ ├── Chatbot.py
│ │ └── ingest.py
│ ├── data
│ ├── requirements.txt
│
└── README.md


---

## ⚙️ Installation and Setup

### Clone Repository

```bash
git clone <repository-url>

#Backend Setup

##Navigate to backend:

cd backend

##Create virtual environment:

python -m venv venv

##Activate environment:

#Windows:

venv\Scripts\activate

##Install dependencies:

pip install -r requirements.txt

##Run backend:

uvicorn main:app --reload

##Backend runs at:

http://127.0.0.1:8000

#Frontend Setup

#Navigate to frontend:

cd frontend

#Install packages:

npm install

#Run React:

npm run dev

🔐 Environment Variables

Backend .env

#GROQ_API_KEY=your_api_key


🎯 Future Improvements
Add voice interaction
Add conversation memory
Add authentication
Improve UI animations
Add analytics dashboard


👨‍💻 Author
Vimal Sharath
Computer Science Engineering Student

Skills:

Artificial Intelligence
Machine Learning
Full Stack Development
