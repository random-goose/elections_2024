from functions import *
from flask import Flask, request, jsonify, send_file  # type: ignore
import requests  # type: ignore
import pandas as pd #type: ignore
from flask_cors import CORS #type: ignore
import warnings
import os

warnings.filterwarnings("ignore")

app = Flask(__name__)
CORS(app)

# Preprocessing
global df
df = pd.read_csv('meta_ad_data.csv')

# Convert delivery time columns to datetime
df['ad_delivery_start_time'] = pd.to_datetime(df['ad_delivery_start_time'], errors='coerce')
df['ad_delivery_stop_time'] = pd.to_datetime(df['ad_delivery_stop_time'], errors='coerce')

# Drop rows with missing delivery times
df = df.dropna(subset=['ad_delivery_start_time', 'ad_delivery_stop_time'])

# Use raw strings for regex patterns to avoid SyntaxWarnings
df[['lower_bound_spend', 'upper_bound_spend']] = df['spend'].str.extract(r'lower_bound: (\d+), upper_bound: (\d+)')
df[['lower_bound_impressions', 'upper_bound_impressions']] = df['impressions'].str.extract(r'lower_bound: (\d+), upper_bound: (\d+)')

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

df.to_csv('meta_ad_data_cleaned.csv', index=False)

#processing demographic and regions
demographics = []
regions = []
for i in tqdm(range(len(df))):
    try:
        if pd.notna(df["demographic_distribution"][i]):
            strx = "[" + df["demographic_distribution"][i] + "]"
            demographics.append(eval(strx))
        else:
            demographics.append([])
    except (KeyError, SyntaxError) as e:
        demographics.append([])
df["parsed_demographics"] = demographics
for i in tqdm(range(len(df))):
    try:
        if pd.notna(df["delivery_by_region"][i]):
            strx = "[" + df["delivery_by_region"][i] + "]"
            regions.append(eval(strx))
        else:
            regions.append([])
    except (KeyError, SyntaxError) as e:
        regions.append([])
df["parsed_region"] = regions
#finished eda
net=pd.read_csv("parties - parties.csv")
netdict={}
columns_list = net.columns.tolist()
for i in columns_list:
  listx=[]
  for j in net[i]:
    if(j==j):
      listx.append(j)
  netdict[i]=listx
def get_names_direct(row,column1,column2,data_dict=netdict):
    if row[column1] != row[column1] and row[column2] != row[column2]:
        return []
    input_string=str(row[column1])+' '+str(row[column2])
    sorted_elements = sorted(
        [(key, item) for key, values in data_dict.items() for item in values],
        key=lambda x: len(x[1]),
        reverse=True
    )
    matched_elements = []
    for key, element in sorted_elements:
        if element in input_string:
            if key not in matched_elements:  # Ensure the key's 0th element is added only once
                matched_elements.append(data_dict[key][0])
            input_string = input_string.replace(element, ' ')
    return list(set(matched_elements))
tqdm.pandas()

#precomputing the party names
df['party'] = df.progress_apply(lambda x: get_names_direct(x, 'page_name', 'ad_creative_bodies'), axis=1)
def assign_party(parties):
    if len(parties) == 1:
        return parties[0]
    elif len(parties) > 1:
        return None
    else:
        return None
df['party'] = df['party'].apply(assign_party)

print(df.value_counts(subset='party'))

#http://127.0.0.1:5000/graph1
#{
#    "start_date": "2010-01-01",
#    "end_date": "2024-12-31",
#    "render_column":"lower_bound_impressions"
#}

@app.route('/graph1', methods=['GET', 'POST'])
def graph1():
    try:
        if request.method == 'POST':
            data = request.get_json()
        else:
            # Handle GET request with query parameters
            data = request.args.to_dict()
        # print("Received data:", data)
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
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500


#http://127.0.0.1:5000/graph2
#{
#    "start_date": "2010-01-01",
#    "end_date": "2024-12-31",
#    "render_column":"upper_bound_impressions",
#    "party":"BJP"
#}
@app.route('/graph2', methods=['GET', 'POST'])
def graph2():
    try:
        if request.method == 'POST':
            # Handle POST request with JSON body
            data = request.get_json()
        else:
            # Handle GET request with query parameters
            data = request.args.to_dict()
            # Ensure 'party' is handled as a list for consistency
            if 'party' in data and isinstance(data['party'], str):
                data['party'] = data['party'].split(',')

        print("Received data:", data)

        # Extract parameters
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        column = data.get('render_column')
        party_name = data.get('party', [])  # Default to an empty list if not provided

        # Generate the Plotly figure
        fig = plot_party_spending_by_language(df, start_date, end_date, party_name, column)

        # Convert the figure to HTML for embedding in an iframe
        graph_html = fig.to_html(full_html=False)
        return graph_html  # Return the HTML content for iframe embedding

    except Exception as e:
        print("Error occurred:", str(e))
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500



@app.route('/graph3', methods=['POST', 'GET'])
def graph3():
    try:
        data = request.args.to_dict()
        data['party'] = data['party'].split(',')
        data['language'] = data['language'].split(',')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        column = data.get('render_column')
        party = data.get('party', [])
        language = data.get('language', [])

        print("Received data:", {
            'start_date': start_date,
            'end_date': end_date,
            'render_column': column,
            'party': party,
            'language': language
        })
        fig = plot_statewise_spending_by_language(df, start_date, end_date, party, language, column)
        graph_html = fig.to_html(full_html=False)

        return graph_html
    except Exception as e:
        print("Error occurred:", str(e))
        return send_file(
            './data-error.gif',  
            mimetype='image/gif'
        ), 500


# {
#     "start_date": "2010-01-01",
#     "end_date": "2024-01-31",
#     "render_column": [
#         "lower_bound_impressions",
#         "upper_bound_impressions"
#     ],
#     "state": ["Jharkhand", "Andhra Pradesh"],
#     "language": ["hi", "te"]
# }

@app.route('/graph4', methods=['POST', 'GET'])
def graph4():
    if request.method == 'POST':
        data=request.get_json()
        start_date=data['start_date']
        end_date=data['end_date']
        column=data['render_column']
        language = data['language']
        state = data['state']
        x = plot_partywise_spending_by_state_language(df, start_date, end_date, state, language, column)
        return jsonify(x)
    else:
        data = request.args.to_dict()
        data['language'] = data['language'].split(',')
        data['state'] = data['state'].split(',')
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        render_column = data.get('render_column')
        language = data.get('language', [])
        state = data.get('state', [])
        
        x = plot_partywise_spending_by_state_language(df, start_date, end_date, state, language, render_column)
        graph_html = x.to_html(full_html=False)

        return graph_html


@app.route('/graph5', methods=['POST', 'GET'])
def graph5():
    data=request.args.to_dict()
    data['party'] = data['party'].split(',')
    data['gender'] = data['gender'].split(',')
    start_date=data.get('start_date')
    end_date=data.get('end_date')
    column=data.get('render_column')
    party = data.get('party', [])
    gender = data.get('gender', [])
    x = plot_age_gender_party(df, start_date, end_date, party,gender,column)
    graph_html = x.to_html(full_html=False)

    return graph_html


@app.route('/graph6', methods=['POST', 'GET'])
def graph6():
    data=request.args.to_dict()
    data['party'] = data['party'].split(',')
    data['age'] = data['age'].split(',')
    start_date=data.get('start_date')
    end_date=data.get('end_date')
    column=data.get('render_column')
    age = data.get('age', [])
    party = data.get('party', [])
    x = plot_gender_age_party(df, start_date, end_date, party, age, column)
    graph_html = x.to_html(full_html=False)

    return graph_html

@app.route('/graph7', methods=['POST', 'GET'])
def graph7():
    data=request.args.to_dict()
    data['gender'] = data['gender'].split(',')
    data['age'] = data['age'].split(',')
    start_date=data['start_date']
    end_date=data['end_date']
    column=data['render_column']
    age = data['age']
    gender = data['gender']
    x = plot_party_sums_by_age_gender(df, start_date, end_date, age,gender,column)
    graph_html = x.to_html(full_html=False)

    return graph_html


# {
#     "start_date": "2010-01-01",
#     "end_date": "2019-12-31",
#     "render_column": "upper_bound_spend",
#     "party": [
#         "BJP",
#         "TDP"
#     ],
#     "state": [
#         "Telangana",
#         "Haryana",
#         "Andhra Pradesh"
#     ]
# }
@app.route('/graph8', methods=['POST', 'GET'])
def graph8():
    data=request.args.to_dict()
    data['party'] = data['party'].split(',')
    data['state'] = data['state'].split(',')
    start_date=data['start_date']
    end_date=data['end_date']
    column=data['render_column']
    party = data['party']
    state = data['state']
    x = plot_lang_by_party_states(df, start_date, end_date, party, state, column)
    graph_html = x.to_html(full_html=False)

    return graph_html

@app.route('/graph9', methods=['POST', 'GET'])
def graph9():
    data=request.args.to_dict()
    start_date=data['start_date']
    end_date=data['end_date']
    x = daily_freq(df, start_date, end_date)
    graph_html = x.to_html(full_html=False)

    return graph_html

@app.route('/graph10', methods=['POST', 'GET'])
def graph10():
    data=request.args.to_dict()
    start_date=data['start_date']
    end_date=data['end_date']
    column = data['render_column']
    x = daily_amount_sum(df, start_date, end_date,column)
    graph_html = x.to_html(full_html=False)

    return graph_html
    


results = pd.read_csv('voteshare_difference.csv')

def vote_diff(state: list):
    diff_df = pd.DataFrame(columns=['Party', 'Vote Difference'])
    rows = []
    for index, row in results.iterrows():
        if row['State'] in state:
            rows.append({'Party': row['Party'], 'Vote Difference': row['Voteshare_Difference'] })
    diff_df = pd.concat([diff_df, pd.DataFrame(rows)], ignore_index=True)

    fig = px.histogram(
        diff_df,
        x='Party',
        y='Vote Difference',
        labels={'Party': 'Party', 'sum of Vote Difference': 'Voteshare Difference', 'Vote Difference': 'Voteshare Difference'},
        histfunc='sum',
        color_discrete_sequence=px.colors.qualitative.Plotly,
        template='plotly_white'
    )
    fig.update_yaxes(title_text='Voteshare Difference % between 2019 and 2024')
    # fig.write_html("result.html")
    return fig

def vote_diff_state(party: list):
    diff_df = pd.DataFrame(columns=['State', 'Vote Difference'])
    rows = []
    for index, row in results.iterrows():
        if row['Party'] in party:
            rows.append({'State': row['State'], 'Vote Difference': row['Voteshare_Difference'] })
    diff_df = pd.concat([diff_df, pd.DataFrame(rows)], ignore_index=True)

    fig = px.histogram(diff_df, x='State', y='Vote Difference', 
                           labels={'state': 'State', 'Vote Difference Percent': 'Vote Difference'},
                           histfunc='sum',
                           color_discrete_sequence=px.colors.qualitative.Plotly,
                           template='plotly_white')
    fig.update_yaxes(title_text='Voteshare Difference % between 2019 and 2024')
    # fig.write_html("result.html")
    return fig

@app.route('/results', methods=['GET'])
def vote_diff_graph():
    state = request.args.get('state')
    fig = vote_diff(state)
    graph_html = fig.to_html(full_html=False)
    return graph_html

@app.route('/resultss', methods=['GET'])
def vote_diff_graph_state():
    party = request.args.get('party')
    fig = vote_diff_state(party)
    graph_html = fig.to_html(full_html=False)
    return graph_html



if __name__ == "__main__":
    from watchdog.observers import Observer #type: ignore
    from watchdog.events import FileSystemEventHandler #type: ignore

    class MyHandler(FileSystemEventHandler):
        def on_modified(self, event):
            if 'anaconda' not in event.src_path.lower():
                print(f"File changed: {event.src_path}")

    path = os.getcwd()
    event_handler = MyHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=True)
    observer.start()

    try:
        app.run(debug=True, use_reloader=False, port=5100)
    finally:
        observer.stop()
        observer.join()