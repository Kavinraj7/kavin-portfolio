from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from rag.Chatbot import ask_ai


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Vimal AI Backend Running"
    }


@app.post("/chat")
def chat(data: dict):
    question = data.get("question", "") if isinstance(data, dict) else ""
    answer = ask_ai(question)

    return {
        "answer": answer
    }