from pathlib import Path

from dotenv import load_dotenv

from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

from langchain_groq import ChatGroq

from langchain_classic.chains import RetrievalQA


load_dotenv()


RESUME_PATH = Path(__file__).resolve().parent.parent / "data" / "resume.txt"


def _load_resume_text():
    try:
        return RESUME_PATH.read_text(encoding="utf-8")
    except Exception:
        return ""


resume_text = _load_resume_text()


try:
    # Load embeddings
    embeddings = GoogleGenerativeAIEmbeddings(
        model="models/gemini-embedding-001"
    )

    # Load Chroma database
    db = Chroma(
        persist_directory="rag/chroma_db",
        embedding_function=embeddings
    )

    # Create retriever
    retriever = db.as_retriever(
        search_kwargs={
            "k": 3
        }
    )

    # Groq LLM
    llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.3
)

    # Create RAG chain
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever
    )
except Exception as exc:
    qa_chain = None
    init_error = exc


def get_fallback_answer(question):
    normalized = (question or "").lower()

    if any(keyword in normalized for keyword in ["skill", "technology", "tool", "programming"]):
        return "I work with Python, JavaScript, React, FastAPI, LangChain, ChromaDB, and cloud deployment tools."

    if any(keyword in normalized for keyword in ["education", "college", "cgpa"]):
        return "I am pursuing a B.E. in Computer Science at SRM Valliammai Engineering College with a CGPA of 8.54."

    if any(keyword in normalized for keyword in ["project", "experience", "intern", "work"]):
        return "I have worked on AI portfolio systems, Alzheimer’s disease prediction, an AI resume assistant, and a study planner app, plus internship experience with FutureIntern."

    return "I can help with information about Vimal’s skills, projects, education, and experience. Ask me anything about his portfolio."


def ask_ai(question):
    if not question or not str(question).strip():
        return "Please ask me something about Vimal."

    if qa_chain is None:
        return get_fallback_answer(question)

    try:
        response = qa_chain.invoke(
            {
                "query": question
            }
        )
        result = response.get("result") if isinstance(response, dict) else None
        if isinstance(result, str) and result.strip():
            return result.strip()
    except Exception as exc:
        print(f"RAG error: {exc}")

    return get_fallback_answer(question)



if __name__ == "__main__":

    while True:

        question = input("\nAsk about Vimal: ")

        if question.lower()=="exit":
            break

        answer = ask_ai(question)

        print("\nAI:", answer)