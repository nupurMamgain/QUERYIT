"""from langchain_community.document_loaders import WebBaseLoader

loader = WebBaseLoader(
   "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2025"  header_template={
       "User-Agent": "Mozilla/5.0"
  }
)

docs = loader.load()
print(len(docs))
print(docs[0].page_content[:300])


from langchain_community.document_loaders import UnstructuredURLLoader

from langchain_text_splitters import RecursiveCharacterTextSplitter

inks=UnstructuredURLLoader(urls=["https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2025"])
docs=links.load()
print(len(docs))
print(docs[0])


split=RecursiveCharacterTextSplitter(
  chunk_size=200,
  chunk_overlap=0
)

text=split.split_text(docs[0].page_content)
print(len(docs))

import pandas as pd
table=pd.read_excel("C:/Users/nupur/OneDrive/Documents/bot.xlsx")
print(table.shape)
print(table)

# #👉 Hugging Face provides
# #👉 Sentence Transformers = models that convert text → vectors

# from langchain_huggingface import HuggingFaceEmbeddings

# embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
# vectors=embeddings.embed_documents(table["Text"].tolist())
# #print(len(vectors[1]))
# dim=len(vectors[1])

# #FAISS is a library that:
# #👉 stores vectors (numbers) and finds the most similar ones FAST
# import numpy as np
# import faiss
# index=faiss.IndexFlatL2 (dim)
# vectors = np.array(vectors).astype("float32") 
# index.add(vectors)
# print(index.ntotal)
# #IndexFlatL2 = FAISS method that finds closest vectors using L2 distance
# #L2👉 Distance formula (Euclidean distance)
# query="i want to watch india and australia match"
# vec=embeddings.embed_query(query)
# vectors = np.array(vectors).astype("float32") 
# print(len(vec))
# svec=np.array(vec).reshape(1,-1)
# svec.shape
# dist,word=(index.search(svec,k=2))
# print(word)
# print(table.loc[word[0]])

import os
from dotenv import load_dotenv
from langchain_community.document_loaders import RecursiveUrlLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_classic.chains.retrieval_qa.base import RetrievalQA
import pickle

from dotenv import load_dotenv
load_dotenv()
print(os.getenv("GROQ_API_KEY"))
LLM=ChatGroq(
    model="llama-3.1-70b-versatile",
    temperature=0
)

link1 = RecursiveUrlLoader(
    url= 'https://www.fool.com/investing/2026/04/03/more-bad-news-is-about-to-hit-tesla-earnings/',
    max_depth=1)

link2=RecursiveUrlLoader(
    url="https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-third-quarter-fiscal-2025",
    max_depth=1
)

data = link1.load() + link2.load()
print(len(data))

split=RecursiveCharacterTextSplitter(
    chunk_size=1000,
    chunk_overlap=0)

docs=split.split_documents(data)
print(len(docs)) 

🌐 What max_depth means in RecursiveUrlLoader
Think of it like how far the crawler is allowed to explore links from the main page.
🧠 Simple idea
Depth = 0 → only the given URL
Depth = 1 → URL + links on that page
Depth = 2 → URL + links + links inside those links
and so on…

⚠️ Important Warning
If you set:
max_depth = 3 or more
You might:
scrape hundreds/thousands of pages
slow your program
hit website limits
get messy irrelevant data
embeddings=HuggingFaceEmbeddings(   model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_index=FAISS.from_documents(docs,embeddings)

chain=RetrievalQA.from_llm(llm=LLM,retriever=vector_index.as_retriever())
result = chain.invoke({"query":"what problem is tesla facing?"})
print(result)"""