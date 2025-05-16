from flask import Flask, request, jsonify, make_response
import warnings 
warnings.filterwarnings('ignore')
from flask_cors import CORS
import pandas as pd
from functions import *

app = Flask(__name__)
CORS(app)

global df, df2
df = pd.read_csv("./model_predictions.csv")
df["date"] = pd.to_datetime(df["date"])

@app.before_request
def handle_options_request():
    if request.method == "OPTIONS":
        response = make_response()
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "POST, OPTIONS"
        return response

# News Source visual
@app.route('/source', methods=['POST', 'OPTIONS'])
def source():
    data = request.get_json()
    start_date = data['start_date']
    end_date = data['end_date']
    parties = data['parties']
    states = data['states']
    predictions = data['predictions']

    print("before fn", states)

    d = news_source_visual(df, start_date, end_date, parties, states, predictions)
    return jsonify(d)

@app.route('/prediction', methods=['POST', 'OPTIONS'])
def prediction():
    data = request.get_json()
    start_date = data['start_date']
    end_date = data['end_date']
    parties = data['parties']
    src = data['src']
    states = data['states']

    d = prediction_visual(df, start_date, end_date, parties, states, src)
    return jsonify(d)

@app.route('/statess', methods=['POST', 'OPTIONS'])
def statess():
    data = request.get_json()
    start_date = data['start_date']
    end_date = data['end_date']
    parties = data['parties']
    src = data['src']
    predictions = data['predictions']

    d = states_visual(df, start_date, end_date, parties, predictions, src)
    return jsonify(d)

@app.route('/partiess', methods=['POST', 'OPTIONS'])
def partiess():
    data = request.get_json()
    start_date = data['start_date']
    end_date = data['end_date']
    src = data['src']
    predictions = data['predictions']
    states = data['states']

    d = parties_visual(df, start_date, end_date, states, predictions, src)
    return jsonify(d)

# Set up CORS headers for every response
# @app.after_request
# def after_request(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
#     response.headers.add("Access-Control-Allow-Methods", "GET,POST,OPTIONS")
#     return response

if __name__ == '__main__':
    app.run(debug=True, port=5001)