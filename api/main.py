import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. โหลด config
load_dotenv() 

from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage

app = FastAPI()
groq_key = os.getenv("GROQ_API_KEY")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# 2. ใช้โมเดล Embedding ตัวที่เล็กที่สุด (ขนาดประมาณ 80MB เท่านั้น) 
# ตัวนี้ไม่ต้องใช้ API Key และโหลดไวมากครับ
embeddings = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2"
)

# โหลดข้อมูลสินค้า เช่น Graffiti Robot $89.99
pdf_path = "StreetPlay Toys.pdf"
if not os.path.exists(pdf_path):
    # ถ้าหา PDF ไม่เจอ ให้สร้างข้อมูลจำลองเพื่อให้ระบบรันผ่านไปก่อน
    print(f"⚠️ Warning: Not found {pdf_path}, using dummy data.")
    content = "StreetPlay Toys is located at Pathum Thani. Graffiti Robot price is $89.99 yo yo."
    with open("temp.txt", "w") as f: f.write(content)
    from langchain_community.document_loaders import TextLoader
    loader = TextLoader("temp.txt")
else:
    loader = PyPDFLoader(pdf_path)

docs = loader.load()
text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
splits = text_splitter.split_documents(docs)

vectorstore = Chroma.from_documents(documents=splits, embedding=embeddings)
retriever = vectorstore.as_retriever()

# 3. ส่วนของ Chatbot
llm = ChatGroq(api_key=groq_key, model="llama-3.1-8b-instant")

qa_prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a cool assistant for StreetPlay Toys. Answer concisely and end with 'Na kub'."),
    MessagesPlaceholder("chat_history"),
    ("human", "{input}\n\nContext:\n{context}"),
])

sessions_db = {} 

class ChatRequest(BaseModel):
    session_id: str
    message: str

@app.post("/chat")
async def chat_endpoint(request: ChatRequest):
    if request.session_id not in sessions_db:
        sessions_db[request.session_id] = []
    
    chat_history = sessions_db[request.session_id]
    relevant_docs = retriever.invoke(request.message)
    context = "\n\n".join(doc.page_content for doc in relevant_docs)

    chain = qa_prompt | llm | StrOutputParser()
    response = chain.invoke({
        "input": request.message,
        "chat_history": chat_history,
        "context": context
    })

    chat_history.append(HumanMessage(content=request.message))
    chat_history.append(AIMessage(content=response))

    return {"reply": response}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)