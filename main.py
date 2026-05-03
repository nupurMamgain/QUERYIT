import os
import streamlit as st 
import pickle
import time
from langchain_community.llms import ollama
from langchain_community.chat_models import ChatOllama
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.document_loaders import RecursiveUrlLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_classic.chains.retrieval_qa.base import RetrievalQA
from dotenv import load_dotenv
load_dotenv()
print(os.getenv("OLLAMA_API_KEY"))
LLM=ChatOllama(
    model="llama-3.1-70b-versatile",
    temperature=0
)

st.title="QueryIt"
