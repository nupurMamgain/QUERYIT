# QueryiT

QueryiT is a full-stack AI-powered web application that allows users to input up to **3 URLs** and ask natural language questions.  
The system extracts and processes content from the provided web pages and generates intelligent, context-aware responses using **LangChain-based processing**.

---

## Project Overview

QueryIt solves the problem of manually reading multiple web pages to extract relevant information.

Instead of switching between tabs, users can:

- Provide up to **3 URLs**
- Ask a question in natural language
- Get a **combined, intelligent answer** based on all sources

The system uses **LangChain** to structure and process information efficiently.

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- JavaScript (ES6+)

### Backend
- FastAPI (Python)
- LangChain (LLM orchestration framework)
- Pydantic (data validation)
- Web scraping / URL content extraction

---

## How It Works

1. User enters up to **3 URLs**
2. Backend fetches and extracts text content from each URL
3. LangChain processes and structures the combined information
4. User submits a question
5. The system generates a **context-aware response**
6. Answer is returned to the frontend UI


---

## Features

-  Accepts up to 3 URLs as input
-  Ask natural language questions
-  LangChain-powered intelligent response generation
-  Fast and responsive React UI
-  Modern UI styled with Tailwind CSS
-  Real-time frontend ↔ backend communication
-  Modular and scalable architecture
