from flask import Flask, request
from openai import OpenAI
import os

app = Flask(__name__)

@app.route('/')
def index():
  return '<h1>Psicotest from Flask</h1>'

@app.route('/interpretation', methods=["POST"])
def interpretation():
  prompt = request.json["prompt"]
  openai_api_key = os.getenv("OPENAI_API_KEY")
  openai = OpenAI(
    api_key=openai_api_key
  )
  response = openai.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      { "role": "system", "content": "Eres un psicólogo especializado en el análisis de tests psicológicos de cualquier tipo de paciente" },
      { "role": "user", "content": prompt }
    ],
    temperature=1,
    max_tokens=2000,
  )
  if "error" in response: 
    return {
      "status": 0,
      "message": response["error"]
    }
  text = response.choices[0].message.content
  return {
    "status": 1,
    "message": text
  }

if __name__ == '__main__':
  app.run()