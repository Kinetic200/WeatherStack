from flask import Flask, render_template, request, jsonify
import requests
from dotenv import load_dotenv
import os

# Load environment variables from the .env file
load_dotenv()

app = Flask(__name__)

# Fetch the OpenWeatherMap API key from the .env file
API_KEY = os.getenv('API_KEY')  # Corrected: added missing closing quote

# Route for the homepage
@app.route('/')
def index():
    return render_template('index.html')

# Route to fetch weather data
@app.route('/weather', methods=['POST'])
def get_weather():
    city = request.json.get('city')
    if not city:
        return jsonify({"error": "No city provided"}), 400

    # Fetch weather data from OpenWeatherMap
    weather_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric"
    response = requests.get(weather_url)
    data = response.json()

    if response.status_code != 200:
        return jsonify({"error": "City not found"}), 404

    # Extract weather details including the icon code
    weather = {
        "temperature": data["main"]["temp"],
        "description": data["weather"][0]["description"],
        "city": data["name"],
        "country": data["sys"]["country"],
        "icon": data["weather"][0]["icon"]  # Get the icon code
    }
    return jsonify(weather)

if __name__ == '__main__':
    app.run(debug=True)
