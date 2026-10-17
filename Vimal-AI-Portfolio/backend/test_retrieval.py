from dotenv import load_dotenv

load_dotenv()

from langchain_community.vectorstores import Chroma
from langchain_google_genai import GoogleGenerativeAIEmbeddings

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)

db = Chroma(
    persist_directory="rag/chroma_db",
    embedding_function=embeddings
)

docs = db.similarity_search(
    "What projects has Kavin worked on?",
    k=5
)

for i, doc in enumerate(docs, 1):
    print(f"\n--- CHUNK {i} ---")
    print(doc.page_content)