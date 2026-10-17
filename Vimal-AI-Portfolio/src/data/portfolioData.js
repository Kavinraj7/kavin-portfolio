const portfolioData = {

  personal: {
    name: "R. V. Vimal",
    role: "AI & Full Stack Developer",
    college: "SRM Valliammai Engineering College",
    branch: "Computer Science and Engineering",
    cgpa: "8.54",

    email: "vimal141205@gmail.com",
    github: "https://github.com/Vimalsharath",
    linkedin: "https://linkedin.com/in/vimal-r-v-aba06b298?",

    resume: "/resume.pdf",
  },


  about:
    "I am a Computer Science Engineering student passionate about Artificial Intelligence, Machine Learning, Deep Learning, Generative AI and Full Stack Development. I enjoy building intelligent applications that solve real-world problems.",


  education: {
    degree: "B.E Computer Science and Engineering",
    college: "SRM Valliammai Engineering College",
    cgpa: "8.54",
  },


  skills: {

  Programming: [
    "Python",
    "Java",
    "Kotlin",
    "C",
    "JavaScript",
    "HTML",
    "CSS"
  ],

  AI_ML: [
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "Retrieval-Augmented Generation (RAG)",
    "LangChain",
    "ChromaDB",
    "TensorFlow"
  ],

  Mobile_Development: [
    "Android Development",
    "Jetpack Compose",
    "Room Database",
    "MVVM"
  ],

  Frameworks: [
    "React",
    "FastAPI"
  ],

  Databases: [
    "MySQL",
    "SQLite",
    "ChromaDB"
  ],

  Tools: [
    "Git",
    "GitHub",
    "Android Studio",
    "VS Code",
    "Postman"
  ]

},

  internships: [
    {
      company: "FutureIntern",
      role: "Web Development Intern",
      duration: "2025",
      description:
        "Developed portfolio website and weather forecasting application using API integration."
    }
  ],


  certifications: [

  "NPTEL Certified – Python for Data Science",

  "National Level Hackathon Participant",

  "National Level Conference Participant",

  "Forage / TATA Certified – Data Visualization: Empowering Business with Effective Insights",

  "Simplilearn / SkillUp Certified – Introduction to SQL" , 

  "Prince Infotech Technical Workshop"

],


  projects: [

    {
      title: "AI Portfolio with RAG Chatbot",

      image: "/images/portfolio.png",

      technologies: [
        "React",
        "FastAPI",
        "LangChain",
        "ChromaDB",
        "Groq"
      ],

      description:
        "AI-powered portfolio website that uses Retrieval Augmented Generation to answer questions about my resume, skills and projects."
    },


    {
      title: "Alzheimer's Disease Prediction",

      image: "/images/alzheimer.webp",

      technologies: [
        "Python",
        "TensorFlow",
        "RCNN",
        "ResNet50"
      ],

      description:
        "Deep learning model using RCNN with ResNet50 backbone to classify Alzheimer's MRI images."
    },


    {
      title: "AI Resume / Interview Assistant",

      image: "/images/resume-ai.png",

      technologies: [
        "Python",
        "LangChain",
        "RAG",
        "Groq"
      ],

      description:
        "AI-based assistant that analyzes resume content and answers interview-related questions using Retrieval Augmented Generation."
    },


    {
      title: "Intelligent Study Planner Mobile Application",

      image: "/images/studyplanner.png",

      technologies: [
        "Kotlin",
        "Jetpack Compose",
        "Room Database",
        "Android Studio"
      ],

      description:
        "Android mobile application that helps students manage subjects, tasks, study schedules and progress tracking using Jetpack Compose."
    },


    {
    title: "Police Department ERP Model",

    image: "/images/police.webp",

    technologies: [
      "Java",
      "MySQL",
      "ERP",
      "Database Management"
    ],

    description:
      "Enterprise Resource Planning (ERP) system for police departments to manage case registration, officer assignments, complaint tracking and administrative operations efficiently."
  }

  ]

};

export default portfolioData;