import pandas as pd
import numpy as np
import ast

def get_parties_freq(df_party, parties):
    party_dict = {k: 0 for k in parties}
    
    for _, row in df_party.iterrows():
        found_parties = row['found_party_parsed']
        if isinstance(found_parties, list):
            for party in parties:
                if any(party in fp for fp in found_parties):
                    party_dict[party] += 1
                    break  # Count each row only once per party
    
    return party_dict

def filter_df_date(df_date, start_date, end_date):
    df_date = df_date[df_date['date'] >= start_date]
    df_date = df_date[df_date['date'] <= end_date]
    return df_date

def filter_df_states(df_states, states):
    print(f"filter_df_states - Input: {type(states)}, {states}")
    if len(states) != 0:
        print("Before filtering:", len(df_states))
        print("States to filter by:", states)
        
        # Check available states
        available_states = df_states['state_with_max_count'].dropna().unique()
        print("Available states:", available_states[:10])  # Show first 10
        
        # Filter by states, handling None values
        mask = df_states['state_with_max_count'].notna() & df_states['state_with_max_count'].isin(states)
        df_states = df_states[mask]
        print("After filtering:", len(df_states))
        return df_states
    else:
        return df_states

def filter_df_predictions(df_pred, predictions):
    if len(predictions) != 0:
        return df_pred[df_pred['predictions'].isin(predictions)]
    else:
        return df_pred

def filter_df_parties(df_party, parties):
    print(f"filter_df_parties - Input parties: {parties}")
    print(f"DataFrame length before party filtering: {len(df_party)}")
    
    if len(parties) != 0:
        # Show sample of found_party_parsed data
        print("Sample found_party_parsed data:")
        for i, row in df_party.head(3).iterrows():
            print(f"  Row {i}: {row['found_party_parsed']}")
        
        # Create a mask for rows that contain any of the specified parties
        def contains_party(party_list, target_parties):
            if not isinstance(party_list, list):
                return False
            return any(any(target_party in found_party for found_party in party_list) for target_party in target_parties)
        
        mask = df_party['found_party_parsed'].apply(lambda x: contains_party(x, parties))
        result_df = df_party[mask]
        print(f"DataFrame length after party filtering: {len(result_df)}")
        return result_df
    else:
        return df_party

def filter_df_src(df_src, news_src):
    # Handle empty DataFrame
    if len(df_src) == 0:
        print("Warning: DataFrame is empty in filter_df_src")
        return df_src
    
    # Check if Source column exists
    if 'Source' not in df_src.columns:
        print(f"Warning: 'Source' column not found. Available columns: {df_src.columns.tolist()}")
        return df_src
    
    if len(news_src) != 0:
        print(f"Filtering by news sources: {news_src}")
        print(f"Available sources in data: {df_src['Source'].unique()}")
        return df_src[df_src['Source'].isin(news_src)]
    return df_src

def news_source_visual(df, start_date, end_date, parties, states, predictions):
    print("start:" + str(len(df)))
    print("Available columns:", df.columns.tolist())
    df = filter_df_date(df, start_date, end_date)
    print("date:" + str(len(df)))
    df = filter_df_states(df, states)
    print("state:" + str(len(df)))
    df = filter_df_predictions(df, predictions)
    print("pred:" + str(len(df)))
    df = filter_df_parties(df, parties)
    print("party:" + str(len(df)))
    
    # Check if Source column exists, if not, use the correct column name
    source_col = 'Source' if 'Source' in df.columns else df.columns[1]  # Assuming it's the second column
    print(f"Using source column: {source_col}")
    
    d = dict(df[source_col].value_counts())
    d = {k: int(v) for k, v in d.items()}
    return d

def prediction_visual(df, start_date, end_date, parties, states, news_src):
    df = filter_df_date(df, start_date, end_date)
    df = filter_df_states(df, states)
    df = filter_df_parties(df, parties)
    df = filter_df_src(df, news_src)
    d = dict(df['predictions'].value_counts())
    d = {k: int(v) for k, v in d.items()}
    return d

def states_visual(df, start_date, end_date, parties, predictions, news_src):
    print(f"states_visual - Initial DataFrame length: {len(df)}")
    print(f"Input parameters - parties: {parties}, predictions: {predictions}, news_src: {news_src}")
    
    df = filter_df_date(df, start_date, end_date)
    print(f"After date filtering: {len(df)}")
    
    df = filter_df_predictions(df, predictions)
    print(f"After prediction filtering: {len(df)}")
    
    df = filter_df_parties(df, parties)
    print(f"After party filtering: {len(df)}")
    
    df = filter_df_src(df, news_src)
    print(f"After source filtering: {len(df)}")
    
    # Filter out None values for state counts
    df_filtered = df[df['state_with_max_count'].notna()]
    print(f"After removing null states: {len(df_filtered)}")
    
    if len(df_filtered) == 0:
        print("Warning: No data left after filtering")
        return {}
    
    d = dict(df_filtered['state_with_max_count'].value_counts())
    d = {k: int(v) for k, v in d.items()}
    return d

def parties_visual(df, start_date, end_date, states, predictions, news_src):
    parties = ['BJP','INC','AAP','TMC','NCP','SP','SHIVSENA','JD(U)','TDP','YSRCP','DMK','BSP','RJD','BJD','CPI(M)']
    df = filter_df_date(df, start_date, end_date)
    df = filter_df_predictions(df, predictions)
    df = filter_df_src(df, news_src)
    df = filter_df_states(df, states)
    d = get_parties_freq(df, parties)
    d = {k: int(v) for k, v in d.items()}
    return d