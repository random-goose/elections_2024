from flask import Flask, request, jsonify, make_response
import warnings
warnings.filterwarnings('ignore')
from flask_cors import CORS
import pandas as pd
import ast
from functions import *

app = Flask(__name__)
CORS(app)

global df
df = pd.read_csv("./model_predictions_cleaned.csv")
print("DataFrame columns:", df.columns.tolist())
print("DataFrame shape:", df.shape)
print("First few rows:")
print(df.head())
df["date"] = pd.to_datetime(df["date"])

# Parse the dictionary and list columns
def parse_aggregated_state_counts(row):
    try:
        if pd.isna(row) or row == '{}':
            return {}
        return ast.literal_eval(row)
    except:
        return {}

def parse_list_column(row):
    try:
        if pd.isna(row):
            return []
        return ast.literal_eval(row)
    except:
        return []

# Apply parsing to the dataframe
df['aggregated_state_counts_parsed'] = df['aggregated_state_counts'].apply(parse_aggregated_state_counts)
df['found_party_parsed'] = df['found_party'].apply(parse_list_column)
df['found_parties_parsed'] = df['found_parties'].apply(parse_list_column)

# Create state_with_max_count column
def get_state_with_max_count(state_dict):
    if not state_dict:
        return None
    return max(state_dict, key=state_dict.get)

df['state_with_max_count'] = df['aggregated_state_counts_parsed'].apply(get_state_with_max_count)

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

if __name__ == '__main__':
    app.run(debug=True, port=5001)