from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import requests
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

# New way to initialize Gemini
client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

def get_gemini_response(message):
    response = client.models.generate_content(
        model="gemini-2.5-flash-lite",
        contents=message
    )
    return response.text

def get_openrouter_response(message):
    response = requests.post(
        url="https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {os.getenv('OPENROUTER_API_KEY')}",
            "Content-Type": "application/json"
        },
        json={
            "model": "openrouter/free",
            "messages": [
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": message}
            ]
        }
    )
    
    data = response.json()
    
    # Print full response so you can see the actual error
    print("OpenRouter response:", data)
    
    # Check for error in response
    if 'error' in data:
        return f"OpenRouter error: {data['error'].get('message', 'Unknown error')}"
    
    if 'choices' not in data:
        return f"Unexpected response: {data}"
    
    return data['choices'][0]['message']['content']

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data['message']
    provider = data.get('provider', 'gemini')

    try:
        if provider == 'gemini':
            reply = get_gemini_response(user_message)
        elif provider == 'openrouter':
            reply = get_openrouter_response(user_message)
        else:
            reply = "Unknown provider selected."
    except Exception as e:
        reply = f"Error: {str(e)}"

    return jsonify({'reply': reply})

if __name__ == '__main__':
    app.run(debug=True)