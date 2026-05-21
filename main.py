import os
import pickle
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain_community.document_loaders import UnstructuredURLLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from models import URLRequest,QUESTIONRequest
from langchain_groq import ChatGroq
from langchain_classic.chains.retrieval_qa.base import RetrievalQA  # ✅ FIXED (no deprecated path)

from dotenv import load_dotenv
load_dotenv()
app=FastAPI()
#----------------FASTAPI APP-------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
 
)
# ---------------- LLM (GROQ - FAST) ----------------
LLM = ChatGroq(
    api_key=os.getenv("GROQ_API_KEY"),
    model="llama-3.1-8b-instant",
    temperature=0
)



file_path = "faiss.pkl"

@app.get("/")
def home():
    return{"message":"backend is working"}
# ---------------- BUILD VECTOR DB ----------------
@app.post("/process-urls")
def process(request: URLRequest):
    urls = [u for u in urls if u.strip() != ""]  # remove empty URLs

    loader = UnstructuredURLLoader(urls=urls)
    data = loader.load()

    text_splitter = RecursiveCharacterTextSplitter(
        separators=['\n\n', '\n', '.', ','],
        chunk_size=1000,
        chunk_overlap=200
    )
    docs = text_splitter.split_documents(data)

    
    embeddings = HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

    vectorstore = FAISS.from_documents(docs, embeddings)

    with open(file_path, "wb") as f:
        pickle.dump(vectorstore, f)
        
    return {"message":"urls processed successfully"}   

    

# ---------------- QUERY ----------------

@app.post("/ask")
def askques(request: QUESTIONRequest):
    if not os.path.exists(file_path):
        return {"error":"please process urls first"}

    if os.path.exists(file_path):

        with open(file_path, "rb") as f:
            vectorstore = pickle.load(f)

        retriever = vectorstore.as_retriever()

        chain = RetrievalQA.from_chain_type(
            llm=LLM,
            retriever=retriever,
            return_source_documents=True
        )

        result = chain.invoke({"query": request.question})
        return {
            "answer":result["result"]
        }  

