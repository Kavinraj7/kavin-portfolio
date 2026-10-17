export function getFallbackReply(question = "") {
  const normalized = question.toLowerCase();

  if (normalized.includes("skill") || normalized.includes("technology") || normalized.includes("tool")) {
    return "I work with Python, JavaScript, React, FastAPI, LangChain, ChromaDB, and cloud deployment tools. I can also share more details about my AI and full-stack projects.";
  }

  if (normalized.includes("education") || normalized.includes("college") || normalized.includes("cgpa")) {
    return "I am pursuing a B.E. in Computer Science at SRM Valliammai Engineering College with a CGPA of 8.54.";
  }

  if (normalized.includes("project") || normalized.includes("experience") || normalized.includes("intern")) {
    return "I have worked on AI portfolio systems, Alzheimer’s disease prediction, an AI resume assistant, and a study planner app, plus internship experience with FutureIntern.";
  }

  return "I’m here to help with information about Vimal’s skills, projects, education, and experience. Ask me anything about his portfolio.";
}
