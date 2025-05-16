from functions import *
from flask import Flask, request, jsonify, send_file  # type: ignore
import pandas as pd #type: ignore
from flask_cors import CORS #type: ignore
import warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

#preprocessing
global df 
df = pd.read_csv('google_ad_data.csv')
df.rename(columns={'Spend_Range_Min_INR': 'lower_bound_spend', 'Spend_Range_Max_INR': 'upper_bound_spend', 'ad_delivery_start_time': 'ad_delivery_stop_time', 'Date_Range_Start': 'ad_delivery_start_time'}, inplace=True)
df.columns = df.columns.str.lower()
print(df.columns)

df['ad_delivery_start_time'] = pd.to_datetime(df['ad_delivery_start_time'], errors='coerce')
df['ad_delivery_stop_time'] = pd.to_datetime(df['ad_delivery_stop_time'], errors='coerce')
# df = df.dropna(subset=['ad_delivery_start_time', 'ad_delivery_stop_time'])
# df[['lower_bound_spend', 'upper_bound_spend']] = df['spend'].str.extract('lower_bound: (\d+), upper_bound: (\d+)')
# df[['lower_bound_impressions', 'upper_bound_impressions']] = df['impressions'].str.extract('lower_bound: (\d+), upper_bound: (\d+)')
# Fill NaN values with 0


df['lower_bound_spend'].fillna(0, inplace=True)
df['upper_bound_spend'].fillna(0, inplace=True)
df['lower_bound_impressions'].fillna(0, inplace=True)
df['upper_bound_impressions'].fillna(0, inplace=True)
# Convert the extracted columns to integers
df['lower_bound_spend'] = df['lower_bound_spend'].astype(int)
df['upper_bound_spend'] = df['upper_bound_spend'].astype(int)
df['lower_bound_impressions'] = df['lower_bound_impressions'].astype(int)
df['upper_bound_impressions'] = df['upper_bound_impressions'].astype(int)


@app.route('/graph1', methods=['GET', 'POST'])
def graph1():
    try:
        if request.method == 'POST':
            data = request.get_json()
        else:
            # Handle GET request with query parameters
            data = request.args.to_dict()
            
        # Extract parameters
        start_date = data.get('start_date')  # Default values if missing
        end_date = data.get('end_date')
        column = data.get('render_column')
        
        # Generate the Plotly figure
        fig = party_spend_with_dates(df, start_date, end_date, column)
        # Convert the figure to HTML
        graph_html = fig.to_html(full_html=False)
        return graph_html  # Return the HTML content for iframe embedding
    
    except Exception as e:
        print("Error occurred:", str(e))
        # Return a GIF with appropriate headers
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500


@app.route('/graph2', methods=['GET', 'POST'])
def graph2():
    try:
        if request.method == 'POST':
            # Handle POST request with JSON body
            data = request.get_json()
        else:
            # Handle GET request with query parameters
            data = request.args.to_dict()
        
        # Extract parameters from the data
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        column = data.get('render_column')
        age = data.get('age', '').split(',')  # Split comma-separated string into a list
        gender = data.get('gender', '').split(',')
        parties = data.get('party', '').split(',')

        fig = plot_gender_age_state_party(df, start_date, end_date, age, gender, column, parties)
        graph_html = fig.to_html(full_html=False)
        return graph_html  # Return the HTML content for iframe embedding

    except Exception as e:
        print("Error occurred:", str(e))
        # Return a GIF with appropriate headers
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500



@app.route('/graph3', methods=['POST', 'GET'])
def graph3():
    try:
        if request.method == 'POST':
            data=request.get_json()
            start_date=data['start_date']
            end_date=data['end_date']
            x = daily_freq(df, start_date, end_date)
            return jsonify(x)
        else:
            data=request.args.to_dict()
            start_date=data['start_date']
            end_date=data['end_date']
            x = daily_freq(df, start_date, end_date)
            graph_html = x.to_html(full_html=False)

            return graph_html
    
    except Exception as e:
        print("Error occurred:", str(e))
        # Return a GIF with appropriate headers
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500

@app.route('/graph4', methods=['POST', 'GET'])
def graph4():
    try:
        if request.method == 'POST':
            data=request.get_json()
            start_date=data['start_date']
            end_date=data['end_date']
            column = data['render_column']
            x = daily_amount_sum(df, start_date, end_date,column)
            return jsonify(x)
        else:
            data=request.args.to_dict()
            start_date=data['start_date']
            end_date=data['end_date']
            column = data['render_column']
            x = daily_amount_sum(df, start_date, end_date,column)
            graph_html = x.to_html(full_html=False)
            return graph_html
    
    except Exception as e:
        print("Error occurred:", str(e))
        # Return a GIF with appropriate headers
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500




@app.route('/graph5', methods=['GET', 'POST'])
def graph5():
    try:
        if request.method == 'POST':
            # Handle POST request with JSON body
            data = request.get_json()
        else:
            # Handle GET request with query parameters
            data = request.args.to_dict()
        
        # Extract parameters from the data
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        column = data.get('render_column')
        age = data.get('age', '').split(',')  # Split comma-separated string into a list
        gender = data.get('gender', '').split(',')
        states = data.get('state', '')
        states = states.split(',') if states else []
        

        fig = plot_party_spending_by_demographics(df, start_date, end_date, age, gender, column, states)
        graph_html = fig.to_html(full_html=False)
        return graph_html  # Return the HTML content for iframe embedding

    except Exception as e:
        print("Error occurred:", str(e))
        # Return a GIF with appropriate headers
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500

    

if __name__ == '__main__':
    app.run(debug=True, port=5050)