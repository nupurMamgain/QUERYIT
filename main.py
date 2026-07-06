import os
import pickle
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from langchain_groq import ChatGroq
from dotenv import load_dotenv

from models import URLRequest, QUESTIONRequest

load_dotenv()

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173","https://queryit-frontend.vercel.app/","https://queryit-git-main-nupurmamgains-projects.vercel.app/",
                   "https://queryit-84jrt8mq7-nupurmamgains-projects.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


llm = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant",
    temperature=0
)

FILE_PATH = "faiss.pkl"


@app.get("/")
def home():
    return {"message": "backend working"}


@app.post("/process-urls")
def process(request: URLRequest):
    
    from langchain_community.document_loaders import WebBaseLoader
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings import HuggingFaceEmbeddings

    urls = [u.strip() for u in request.urls if u.strip()]

    if not urls:
        return {"error": "No URLs provided"}


    loader = WebBaseLoader(
        urls,
        verify_ssl=False
    )

    docs = loader.load()

    if not docs:
        return {"error": "No content extracted from URLs"}

  
    for doc in docs:
        doc.page_content = " ".join(doc.page_content.split())

 
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1200,
        chunk_overlap=300,
        separators=["\n\n", "\n", ".", " ", ""]
    )

    chunks = splitter.split_documents(docs)
    
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = FAISS.from_documents(chunks, embeddings)

    with open(FILE_PATH, "wb") as f:
        pickle.dump(vectorstore, f)

    return {
        "message": "URLs processed successfully",
        "chunks": len(chunks)
    }
@app.post("/ask")
def ask(request: QUESTIONRequest):

    if not os.path.exists(FILE_PATH):
        return {"answer": "Please process URLs first"}

    with open(FILE_PATH, "rb") as f:
        vectorstore = pickle.load(f)

    retriever = vectorstore.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 6}
    )


    docs = retriever.invoke(request.question)

    if not docs:
        return {"answer": "Not found in provided URLs."}

    context = "\n\n".join(
        d.page_content[:1500] for d in docs
    )
    prompt = f"""
You are a precise QA system.

RULES:
- Use ONLY the context below
- If answer is not clearly in context → say "Not found in provided URLs"
- Wikipedia text may be messy, but extract meaning carefully
- Do NOT guess

Context:
{context}

Question:
{request.question}

Answer:
"""

    response = llm.invoke(prompt)

    return {"answer": response.content}