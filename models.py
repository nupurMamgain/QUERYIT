from pydantic import BaseModel
class URLRequest(BaseModel):
    urls:list[str]
    
class QUESTIONRequest(BaseModel):
    question:str