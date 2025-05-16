import pandas as pd
import numpy as np

def get_parties_freq(df_party, parties):
    df_party2 = pd.DataFrame()
    for party in parties:
        cat_df = df_party[df_party['found_party'].str.contains(party, na = False)]
        df_party2 = pd.concat([df_party2, cat_df], ignore_index= True)
        df_party = df_party[~df_party['found_party'].str.contains(party, na = False)]
    party_dict = {k : 0 for k in parties}
    for party in parties:
        party_dict[party] += len(df_party2[df_party2['found_party'].str.contains(party, na = False)])

    return party_dict
    
    

def filter_df_date(df_date, start_date, end_date):
    df_date = df_date[df_date['date'] >= start_date]
    df_date = df_date[df_date['date'] <= end_date]

    return df_date

def filter_df_states(df_states, states):
    print(type(states))
    print(states)
    if len(states) != 0:
        print("Before filtering:", len(df_states))
        print("States to filter by:", states)
        print(df_states['state_with_max_count'].unique())
        df_states = df_states[df_states['state_with_max_count'].str[0].isin(states)]
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
    if len(parties) != 0:
        df_party2 = pd.DataFrame()
        for party in parties:
            cat_df = df_party[df_party['found_party'].str.contains(party, na = False)]
            df_party2 = pd.concat([df_party2, cat_df], ignore_index= True)
            df_party = df_party[~df_party['found_party'].str.contains(party, na = False)]

        return df_party2
    else:
        return df_party

def filter_df_src(df_src, news_src):
    if len(news_src) !=0:    
        return df_src[df_src['Source'].isin(news_src)]
    return df_src

def news_source_visual(df, start_date, end_date, parties, states, predictions):
    print("start:" + str(len(df)))
    df = filter_df_date(df, start_date, end_date)
    print("date:" + str(len(df)))
    df = filter_df_states(df, states)
    print("state:" + str(len(df)))
    df = filter_df_predictions(df, predictions)
    print("pred:" + str(len(df)))
    df = filter_df_parties(df, parties)
    print("party:" + str(len(df)))
    d = dict(df['Source'].value_counts())
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
    df = filter_df_date(df, start_date, end_date)
    df = filter_df_predictions(df, predictions)
    df = filter_df_parties(df, parties)
    df = filter_df_src(df, news_src)

    d = dict(df['state_with_max_count'].value_counts())
    d = {k: int(v) for k, v in d.items()}

    return d

def parties_visual(df, start_date, end_date, states, predictions, news_src):
    parties = ['BJP','INC','AA.P','TMC','NCP','S.P','SHIVSENA','JD(U)','TDP','YSRCP','DM.K','BS..P','RJD','BJD','CPI(M)']

    df = filter_df_date(df, start_date, end_date)
    df = filter_df_predictions(df, predictions)
    df = filter_df_src(df, news_src)
    df = filter_df_states(df, states)
    d = get_parties_freq(df, parties)
    d = {k: int(v) for k, v in d.items()}

    return d