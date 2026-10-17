from pathlib import Path

from dotenv import load_dotenv

from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.vectorstores import Chroma

load_dotenv()

# Load Kavin's information
DATA_PATH = Path(__file__).resolve().parent.parent / "data" / "kavin.txt"

loader = TextLoader(str(DATA_PATH), encoding="utf-8")
documents = loader.load()

# Split into chunks
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_documents(documents)

print(f"Loaded {len(documents)} document(s)")
print(f"Created {len(chunks)} chunks")

# Gemini embeddings
embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)

# Create ChromaDB
db_path = Path(__file__).resolve().parent / "chroma_db"

db = Chroma.from_documents(
    documents=chunks,
    embedding=embeddings,
    persist_directory=str(db_path)
)

print("Kavin ChromaDB created successfully!")