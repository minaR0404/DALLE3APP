from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import openai
import os
from dotenv import load_dotenv
load_dotenv()

# APIキー設定（環境変数に設定しておくこと）
openai.api_key = os.getenv("OPENAI_API_KEY")

app = FastAPI()

# CORS許可
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PromptRequest(BaseModel):
    prompt: str

@app.post("/generate_image")
async def generate_image(req: PromptRequest):
    try:
        # response = openai.images.generate(
        #     model="dall-e-3",
        #     prompt=req.prompt,
        #     size="1024x1024"
        # )
        ### tmp
        response = openai.images.generate(
            model="dall-e-2",
            prompt=req.prompt,
            size="256x256"
        )
        image_url = response.data[0].url
        return {"url": image_url}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
