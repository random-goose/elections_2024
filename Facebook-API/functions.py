import pandas as pd # type: ignore
from tqdm import tqdm # type: ignore

def filter_ads_by_date_range(df,d1,d2):
    valid_indices = set()
    for single_date in pd.date_range(start=d1, end=d2):
        rows_on_date = df[(df['ad_delivery_start_time'] < single_date) & (df['ad_delivery_stop_time'] > single_date)]
        valid_indices.update(rows_on_date.index)
    filtered_df = df.loc[list(valid_indices)].reset_index(drop=True)  # Convert set to list
    return filtered_df


import plotly.express as px # type: ignore
import plotly.graph_objects as go # type: ignore


def party_spend_with_dates(df, start_date, end_date, columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    if isinstance(columns, list):
        party_spend = df.groupby('party')[columns].sum().reset_index()
        top_10_parties = party_spend.nlargest(10, columns[0]).sort_values(by=columns[0], ascending=False)
        df_top_10 = df[df['party'].isin(top_10_parties['party'])]
        df_melted = df_top_10.melt(id_vars=['party'], value_vars=columns, 
                                   var_name='Spend Type', value_name='Spend Amount')
        fig = px.histogram(df_melted, x='party', y='Spend Amount', color='Spend Type', 
                           title='Spending of Top 10 Parties between {} and {}'.format(start_date, end_date),
                           labels={'party': 'Party', 'Spend Amount': 'Spend Amount'},
                           histfunc='sum',
                           category_orders={'party': top_10_parties['party'].tolist()},
                           color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        party_spend = df.groupby('party')[columns].sum().reset_index()
        top_10_parties = party_spend.nlargest(10, columns).sort_values(by=columns, ascending=False)
        df_top_10 = df[df['party'].isin(top_10_parties['party'])]
        fig = px.histogram(df_top_10, x='party', y=columns, 
                           title='{} of Top 10 Parties between {} and {}'.format(columns, start_date, end_date),
                           labels={'party': 'Party', columns: columns},
                           histfunc='sum',
                           color='party', 
                           category_orders={'party': top_10_parties['party'].tolist()},
                           color_discrete_sequence=px.colors.qualitative.Plotly)
    fig.update_layout(
        xaxis={'categoryorder':'total descending'},
        showlegend=True
    )
    # fig.show()
    fig.write_html("party_spend.html")
    return fig


# def plot_party_spending_by_language(df, start_date, end_date, party_name, columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     party_df = df[df['party'] == party_name]
#     print(len(party_df))
#     if isinstance(columns, list):
#         grouped_df = party_df.groupby('languages')[columns].sum().reset_index()
#         grouped_df = grouped_df.sort_values(by=columns[0], ascending=False)
#         df_melted = grouped_df.melt(id_vars=['languages'], value_vars=columns, 
#                                     var_name='Spend Type', value_name='Spend Amount')
#         fig = px.bar(df_melted, x='languages', y='Spend Amount', color='Spend Type',
#                      title=f'Amount Spent by Language for {party_name}',
#                      labels={'languages': 'Language'},
#                      category_orders={'languages': grouped_df['languages'].tolist()},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         grouped_df = party_df.groupby('languages')[columns].sum().reset_index()
#         grouped_df = grouped_df.sort_values(by=columns, ascending=False)
#         fig = px.bar(grouped_df, x='languages', y=columns,
#                      title=f'Amount Spent by Language for {party_name}',
#                      labels={'languages': 'Language'},
#                      color='languages')
#     fig.show()
#     fig.write_html("party_language.html")
#     return {'count': len(party_df), 'languages': grouped_df.to_dict()}

# def calculate_statewise_spending(df,column):
#     statewise_spending = {}
#     for index, row in df.iterrows():
#         state_distribution = row['parsed_region']
#         for state in state_distribution:
#             percentage = state['percentage']
#             amount = row[column] * percentage
#             if region in statewise_spending:
#                 statewise_spending[region] += amount
#             else:
#                 statewise_spending[region] = amount
#     return statewise_spending

# # Function to plot the statewise histogram for a specific party and language
# def plot_statewise_spending_by_language(df, start_date, end_date, party_name, language, columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     filtered_df = df[(df['party'] == party_name) & (df['languages'] == language)]
#     print(len(filtered_df))
    
#     if isinstance(columns, list):
#         statewise_spending = {col: calculate_statewise_spending(filtered_df, col) for col in columns}
#         statewise_df = pd.DataFrame(statewise_spending)
#         statewise_df['state'] = statewise_df.index
#         statewise_df = statewise_df.reset_index(drop=True)
#         statewise_df = statewise_df.sort_values(by=columns[0], ascending=False).head(10)
#         df_melted = statewise_df.melt(id_vars=['state'], value_vars=columns, 
#                                       var_name='Spend Type', value_name='Spend Amount')
#         fig = px.bar(df_melted, x='state', y='Spend Amount', color='Spend Type',
#                      title=f'Statewise Spending by {party_name} for {language} Language',
#                      labels={'state': 'State'},
#                      category_orders={'state': statewise_df['state'].tolist()},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         statewise_spending = calculate_statewise_spending(filtered_df, columns)
#         statewise_df = pd.DataFrame(list(statewise_spending.items()), columns=['state', columns])
#         statewise_df = statewise_df.sort_values(by=columns, ascending=False).head(10)
#         fig = px.bar(statewise_df, x='state', y=columns,
#                      title=f'Statewise {columns} by {party_name} for {language} Language',
#                      labels={'state': 'State'},
#                      color='state')

#     fig.write_html("statewise_lang.html")
#     fig.show()
#     return {'count': len(filtered_df), 'statewise_spending': statewise_df.to_dict()}

# def calculate_partywise_spending(df, state, language,column):
#     partywise_spending = {}
#     for index, row in df.iterrows():
#         if row['languages'] != language:
#             continue
#         state_distribution = row['parsed_region']
#         for region_info in state_distribution:
#             if region_info['region'] == state:
#                 percentage = region_info['percentage']
#                 amount = row[column] * percentage
#                 party = row['party']
#                 if party in partywise_spending:
#                     partywise_spending[party] += amount
#                 else:
#                     partywise_spending[party] = amount
#     return partywise_spending

# def plot_partywise_spending_by_state_language(df, start_date, end_date, state, language, columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     filtered_df = df[(df['languages'] == language)]
#     print(len(filtered_df))

#     if isinstance(columns, list):
#         partywise_spending = {col: calculate_partywise_spending(filtered_df, state, language, col) for col in columns}
#         partywise_df = pd.DataFrame(partywise_spending)
#         partywise_df['party'] = partywise_df.index
#         partywise_df = partywise_df.reset_index(drop=True)
#         partywise_df = partywise_df.sort_values(by=columns[0], ascending=False).head(10)
#         df_melted = partywise_df.melt(id_vars=['party'], value_vars=columns, 
#                                       var_name='Spend Type', value_name='Spend Amount')
#         fig = px.bar(df_melted, x='party', y='Spend Amount', color='Spend Type',
#                      title=f'Party-wise Spending in {state} for {language} Language',
#                      labels={'party': 'Party'},
#                      category_orders={'party': partywise_df['party'].tolist()},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         partywise_spending = calculate_partywise_spending(filtered_df, state, language, columns)
#         partywise_df = pd.DataFrame(list(partywise_spending.items()), columns=['party', columns])
#         partywise_df = partywise_df.sort_values(by=columns, ascending=False).head(10)
#         fig = px.bar(partywise_df, x='party', y=columns,
#                      title=f'Party-wise {columns} in {state} for {language} Language',
#                      labels={'party': 'Party'},
#                      color='party')

#     fig.write_html("partywise_state_lang.html")
#     fig.show()
#     return {'count': len(filtered_df), 'partywise_spending': partywise_df.to_dict()}

def calculate_statewide_spending(df,column,state_val):
    language_spending = {}
    for index, row in df.iterrows():
        state_distribution = row['parsed_region']
        for state in state_distribution:
            region = state['region']
            percentage = state['percentage']
            if region == state_val:
                amount = row[column] * percentage
                language = row['languages']
                if language in language_spending:
                    language_spending[language] += amount
                else:
                    language_spending[language] = amount
    return language_spending

# def plot_lang_by_party_state(df, start_date, end_date, party, state, numerical_columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     df_filtered = df[(df['party'] == party)]
    
#     if isinstance(numerical_columns, list):
#         lang_sums = {col: calculate_statewide_spending(df_filtered, col,state) for col in numerical_columns}
#         lang_df = pd.DataFrame(lang_sums)
#         lang_df['language'] = lang_df.index
#         lang_df = lang_df.reset_index(drop=True)
#         lang_df = lang_df.sort_values(by=numerical_columns[0], ascending=False).head(10)
#         df_melted = lang_df.melt(id_vars='language', value_vars=numerical_columns, 
#                                  var_name='Spend Type', value_name='sum_amount')
#         fig = px.bar(df_melted, x='language', y='sum_amount', color='Spend Type',
#                      title=f'Spending by Language for {party} in {state}',
#                      labels={'language': 'Language', 'sum_amount': 'Sum Amount'},
#                      category_orders={'language': lang_df['language'].tolist()},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         lang_sums = calculate_statewide_spending(df_filtered, numerical_columns, state)
#         lang_df = pd.DataFrame(list(lang_sums.items()), columns=['language', 'sum_amount'])
#         lang_df = lang_df.sort_values(by='sum_amount', ascending=False).head(10)
#         fig = px.bar(lang_df, x='language', y='sum_amount',
#                      title=f'Spending by Language for {party} in {state}',
#                      labels={'language': 'Language', 'sum_amount': 'Sum Amount'},
#                      color='language')

#     fig.write_html("lang_by_party_state.html")
#     fig.show()
#     return {'count': len(df_filtered), 'lang_sums': lang_df.to_dict()}

# def plot_age_gender_party(df, start_date, end_date, party, gender, numerical_columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     df_filtered = df[df['party'] == party]
#     print(len(df_filtered))

#     # Initialize dictionary for sums
#     if isinstance(numerical_columns, list):
#         age_gender_sums = {col: {} for col in numerical_columns}
#     else:
#         age_gender_sums = {numerical_columns: {}}

#     # Calculate sums for each age group
#     for index, row in df_filtered.iterrows():
#         demographic_data = row['parsed_demographics']
#         for demo in demographic_data:
#             if demo['gender'] == gender:
#                 age_group = demo['age']
#                 percentage = demo['percentage']
#                 for col in age_gender_sums:
#                     amount = row[col] * percentage
#                     if age_group in age_gender_sums[col]:
#                         age_gender_sums[col][age_group] += amount
#                     else:
#                         age_gender_sums[col][age_group] = amount

#     if isinstance(numerical_columns, list):
#         # Handle multiple columns
#         age_gender_dfs = []
#         for col in numerical_columns:
#             df_col = pd.DataFrame(list(age_gender_sums[col].items()), columns=['age_group', col])
#             age_gender_dfs.append(df_col)

#         age_gender_df = age_gender_dfs[0].copy()
#         for i in range(1, len(numerical_columns)):
#             age_gender_df = age_gender_df.merge(age_gender_dfs[i], on='age_group')

#         df_melted = age_gender_df.melt(id_vars='age_group', value_vars=numerical_columns, 
#                                        var_name='Spend Type', value_name='sum_amount')
#         fig = px.bar(df_melted, x='age_group', y='sum_amount', color='Spend Type',
#                      title=f'{party} Spending by Age Group for {gender} Gender',
#                      labels={'age_group': 'Age Group'},
#                      category_orders={'age_group': sorted(age_gender_df['age_group'].unique())},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         # Handle single column
#         age_gender_df = pd.DataFrame(list(age_gender_sums[numerical_columns].items()), columns=['age_group', 'sum_amount'])
#         fig = px.bar(age_gender_df, x='age_group', y='sum_amount',
#                      title=f'{party} Spending by Age Group for {gender} Gender',
#                      labels={'age_group': 'Age Group'},
#                      color='age_group')

#     fig.write_html("partywise_age_gender.html")
#     fig.show()
#     return {'count': len(df_filtered), 'age_group_sums': age_gender_df.to_dict()}

# def plot_gender_age_party(df, start_date, end_date, party, age, numerical_columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     df_filtered = df[df['party'] == party]
#     print(len(df_filtered))

#     # Initialize dictionary for sums
#     if isinstance(numerical_columns, list):
#         gender_group_sums = {col: {} for col in numerical_columns}
#     else:
#         gender_group_sums = {numerical_columns: {}}

#     # Calculate sums for each gender group
#     for index, row in df_filtered.iterrows():
#         demographic_data = row['parsed_demographics']
#         for demo in demographic_data:
#             if demo['age'] == age:
#                 gender = demo['gender']
#                 percentage = demo['percentage']
#                 for col in gender_group_sums:
#                     amount = row[col] * percentage
#                     if gender in gender_group_sums[col]:
#                         gender_group_sums[col][gender] += amount
#                     else:
#                         gender_group_sums[col][gender] = amount

#     if isinstance(numerical_columns, list):
#         # Handle multiple columns
#         gender_group_dfs = []
#         for col in numerical_columns:
#             df_col = pd.DataFrame(list(gender_group_sums[col].items()), columns=['gender', col])
#             gender_group_dfs.append(df_col)

#         gender_group_df = gender_group_dfs[0].copy()
#         for i in range(1, len(numerical_columns)):
#             gender_group_df = gender_group_df.merge(gender_group_dfs[i], on='gender')

#         df_melted = gender_group_df.melt(id_vars='gender', value_vars=numerical_columns, 
#                                          var_name='Spend Type', value_name='sum_amount')
#         fig = px.bar(df_melted, x='gender', y='sum_amount', color='Spend Type',
#                      title=f'{party} Spending by Gender for {age} Age Group',
#                      labels={'gender': 'Gender', 'sum_amount': 'Sum Amount'},
#                      category_orders={'gender': sorted(gender_group_df['gender'].unique())},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         # Handle single column
#         gender_group_df = pd.DataFrame(list(gender_group_sums[numerical_columns].items()), columns=['gender', 'sum_amount'])
#         fig = px.bar(gender_group_df, x='gender', y='sum_amount',
#                      title=f'{party} Spending by Gender for {age} Age Group',
#                      labels={'gender': 'Gender', 'sum_amount': 'Sum Amount'},
#                      color='gender')

#     fig.write_html("partywise_gender_age.html")
#     fig.show()
#     return {'count': len(df_filtered), 'gender_group_sums': gender_group_df.to_dict()}

# def plot_party_sums_by_age_gender(df, start_date, end_date, age, gender, numerical_columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     party_sums = {col: {} for col in (numerical_columns if isinstance(numerical_columns, list) else [numerical_columns])}

#     # Calculate sums for each party
#     for index, row in df.iterrows():
#         if row['party'] is not None:
#             demographic_data = row['parsed_demographics']
#             for demo in demographic_data:
#                 if demo['age'] == age and demo['gender'] == gender:
#                     party = row['party']
#                     percentage = demo['percentage']
#                     for col in party_sums:
#                         amount = row[col] * percentage
#                         if party in party_sums[col]:
#                             party_sums[col][party] += amount
#                         else:
#                             party_sums[col][party] = amount

#     if isinstance(numerical_columns, list):
#         # Handle multiple columns
#         party_sums_dfs = []
#         for col in numerical_columns:
#             df_col = pd.DataFrame(list(party_sums[col].items()), columns=['party', col])
#             party_sums_dfs.append(df_col)

#         party_sums_df = party_sums_dfs[0].copy()
#         for i in range(1, len(numerical_columns)):
#             party_sums_df = party_sums_df.merge(party_sums_dfs[i], on='party')

#         party_sums_df = party_sums_df.sort_values(by=numerical_columns[0], ascending=False).head(10)
#         df_melted = party_sums_df.melt(id_vars='party', value_vars=numerical_columns, 
#                                        var_name='Spend Type', value_name='sum_amount')
#         fig = px.bar(df_melted, x='party', y='sum_amount', color='Spend Type',
#                      title=f'Spending by Party for {age} Age Group and {gender} Gender',
#                      labels={'party': 'Party', 'sum_amount': 'Sum Amount'},
#                      category_orders={'party': party_sums_df['party'].tolist()},
#                      color_discrete_sequence=px.colors.qualitative.Plotly)
#     else:
#         # Handle single column
#         party_sums_df = pd.DataFrame(list(party_sums[numerical_columns].items()), columns=['party', 'sum_amount'])
#         party_sums_df = party_sums_df.sort_values(by='sum_amount', ascending=False).head(10)
#         fig = px.bar(party_sums_df, x='party', y='sum_amount',
#                      title=f'Spending by Party for {age} Age Group and {gender} Gender',
#                      labels={'party': 'Party', 'sum_amount': 'Sum Amount'},
#                      color='party')

#     fig.write_html("age_gender_party.html")
#     fig.show()
#     return {'count': len(df), 'party_sums': party_sums_df.to_dict()}

def daily_freq(df,start_date,end_date):
    df = filter_ads_by_date_range(df, start_date, end_date)
    freq = df.groupby('ad_delivery_start_time').size().reset_index(name='count')
    fig = px.line(freq, x='ad_delivery_start_time', y='count',
                 title='Daily Frequency of Ads',
                 labels={'ad_delivery_start_time': 'Date', 'count': 'Frequency'})
    fig.add_trace(go.Bar(x=freq['ad_delivery_start_time'], y=freq['count'], name='Frequency'))
    
    
    # fig.show()
    fig.write_html("daily_freq.html")
    return fig

# def daily_amount_sum(df, start_date, end_date, columns):
#     df = filter_ads_by_date_range(df, start_date, end_date)
#     print(len(df))

#     if isinstance(columns, list):
#         daily_sum = df.groupby('ad_delivery_start_time')[columns].sum().reset_index()
#         df_melted = daily_sum.melt(id_vars='ad_delivery_start_time', value_vars=columns, 
#                                    var_name='Spend Type', value_name='sum_amount')
#         fig = px.line(df_melted, x='ad_delivery_start_time', y='sum_amount', color='Spend Type',
#                       title=f'Daily Sum of {", ".join(columns)}',
#                       labels={'ad_delivery_start_time': 'Date', 'sum_amount': 'Sum Amount'},
#                       category_orders={'Spend Type': columns})
#     else:
#         daily_sum = df.groupby('ad_delivery_start_time')[columns].sum().reset_index()
#         fig = px.line(daily_sum, x='ad_delivery_start_time', y=columns,
#                       title=f'Daily Sum of {columns}',
#                       labels={'ad_delivery_start_time': 'Date', columns: 'Sum Amount'})

#     fig.show()
#     fig.write_html("daily_sum.html")
#     return {'count': len(df), 'daily_sum': daily_sum.to_dict()}


def daily_amount_sum(df, start_date, end_date, columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    print(len(df))

    if isinstance(columns, list):
        daily_sum = df.groupby('ad_delivery_start_time')[columns].sum().reset_index()
        df_melted = daily_sum.melt(id_vars='ad_delivery_start_time', value_vars=columns, 
                                   var_name='Spend Type', value_name='sum_amount')
        
        # Create the line graph
        fig = px.line(df_melted, x='ad_delivery_start_time', y='sum_amount', color='Spend Type',
                      title=f'Daily Sum of {", ".join(columns)}',
                      labels={'ad_delivery_start_time': 'Date', 'sum_amount': 'Sum Amount'},
                      category_orders={'Spend Type': columns})
        
        # Add the bar graph
        for col in columns:
            fig.add_trace(go.Bar(x=daily_sum['ad_delivery_start_time'], y=daily_sum[col], name=f'Sum Amount ({col})'))
            
    else:
        daily_sum = df.groupby('ad_delivery_start_time')[columns].sum().reset_index()
        
        # Create the line graph
        fig = px.line(daily_sum, x='ad_delivery_start_time', y=columns,
                      title=f'Daily Sum of {columns}',
                      labels={'ad_delivery_start_time': 'Date', columns: 'Sum Amount'})
        
        # Add the bar graph
        fig.add_trace(go.Bar(x=daily_sum['ad_delivery_start_time'], y=daily_sum[columns], name='Sum Amount'))

    # fig.show()
    fig.write_html("daily_sum.html")
    return fig



def calculate_statewides_spending(df, column, states_list):
    language_spending = {}
    for index, row in df.iterrows():
        state_distribution = row['parsed_region']
        for state in state_distribution:
            region = state['region']
            percentage = state['percentage']
            if region in states_list:
                amount = row[column] * percentage
                language = row['languages']
                if language in language_spending:
                    language_spending[language] += amount
                else:
                    language_spending[language] = amount
    return language_spending

def plot_lang_by_party_states(df, start_date, end_date, parties, states, numerical_columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    df_filtered = df[df['party'].isin(parties)]
    
    if isinstance(numerical_columns, list):
        lang_sums = {col: calculate_statewides_spending(df_filtered, col, states) for col in numerical_columns}
        lang_df = pd.DataFrame(lang_sums)
        lang_df['language'] = lang_df.index
        lang_df = lang_df.reset_index(drop=True)
        lang_df = lang_df.sort_values(by=numerical_columns[0], ascending=False).head(10)
        df_melted = lang_df.melt(id_vars='language', value_vars=numerical_columns, 
                                 var_name='Spend Type', value_name='sum_amount')
        fig = px.bar(df_melted, x='language', y='sum_amount', color='Spend Type',
                     title=f'Spending by Language for {", ".join(parties)} in {", ".join(states)}',
                     labels={'language': 'Language', 'sum_amount': 'Sum Amount'},
                     category_orders={'language': lang_df['language'].tolist()},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        lang_sums = calculate_statewides_spending(df_filtered, numerical_columns, states)
        lang_df = pd.DataFrame(list(lang_sums.items()), columns=['language', 'sum_amount'])
        lang_df = lang_df.sort_values(by='sum_amount', ascending=False).head(10)
        fig = px.bar(lang_df, x='language', y='sum_amount',
                     title=f'Spending by Language for {", ".join(parties)} in {", ".join(states)}',
                     labels={'language': 'Language', 'sum_amount': 'Sum Amount'},
                     color='language')

    fig.write_html("lang_by_party_state.html")
    # fig.show()
    return fig

def plot_party_spending_by_language(df, start_date, end_date, party_names, columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    party_df = df[df['party'].isin(party_names)]
    print(len(party_df))
    
    if isinstance(columns, list):
        grouped_df = party_df.groupby('languages')[columns].sum().reset_index()
        grouped_df = grouped_df.sort_values(by=columns[0], ascending=False)
        df_melted = grouped_df.melt(id_vars=['languages'], value_vars=columns, 
                                    var_name='Spend Type', value_name='Spend Amount')
        fig = px.bar(df_melted, x='languages', y='Spend Amount', color='Spend Type',
                     title=f'Amount Spent by Language for {" ,".join(party_names)}',
                     labels={'languages': 'Language'},
                     category_orders={'languages': grouped_df['languages'].tolist()},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        grouped_df = party_df.groupby('languages')[columns].sum().reset_index()
        grouped_df = grouped_df.sort_values(by=columns, ascending=False)
        fig = px.bar(grouped_df, x='languages', y=columns,
                     title=f'Amount Spent by Language for {" ,".join(party_names)}',
                     labels={'languages': 'Language'},
                     color='languages')
    
    # fig.show()
    fig.write_html("party_language.html")
    return fig

def calculate_statewise_spending(df, column):
    statewise_spending = {}
    for index, row in df.iterrows():
        state_distribution = row['parsed_region']
        for state in state_distribution:
            region = state['region']
            percentage = state['percentage']
            amount = row[column] * percentage
            if region in statewise_spending:
                statewise_spending[region] += amount
            else:
                statewise_spending[region] = amount
    return statewise_spending

# Function to plot the statewise histogram for specific parties and languages
def plot_statewise_spending_by_language(df, start_date, end_date, party_names, languages, columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    filtered_df = df[df['party'].isin(party_names) & df['languages'].isin(languages)]
    print(len(filtered_df))
    
    if isinstance(columns, list):
        statewise_spending = {col: calculate_statewise_spending(filtered_df, col) for col in columns}
        statewise_df = pd.DataFrame(statewise_spending)
        statewise_df['state'] = statewise_df.index
        statewise_df = statewise_df.reset_index(drop=True)
        statewise_df = statewise_df.sort_values(by=columns[0], ascending=False).head(10)
        df_melted = statewise_df.melt(id_vars=['state'], value_vars=columns, 
                                      var_name='Spend Type', value_name='Spend Amount')
        fig = px.bar(df_melted, x='state', y='Spend Amount', color='Spend Type',
                     title=f'Statewise Spending by {", ".join(party_names)} for {", ".join(languages)} Language(s)',
                     labels={'state': 'State'},
                     category_orders={'state': statewise_df['state'].tolist()},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        statewise_spending = calculate_statewise_spending(filtered_df, columns)
        statewise_df = pd.DataFrame(list(statewise_spending.items()), columns=['state', columns])
        statewise_df = statewise_df.sort_values(by=columns, ascending=False).head(10)
        fig = px.bar(statewise_df, x='state', y=columns,
                     title=f'Statewise {columns} by {", ".join(party_names)} for {", ".join(languages)} Language(s)',
                     labels={'state': 'State'},
                     color='state')

    fig.write_html("statewise_lang.html")
    # fig.show()
    return fig

def calculate_partywise_spending(df, states, languages, column):
    partywise_spending = {}
    for index, row in df.iterrows():
        if row['languages'] not in languages:
            continue
        state_distribution = row['parsed_region']
        for region_info in state_distribution:
            if region_info['region'] in states:
                percentage = region_info['percentage']
                amount = row[column] * percentage
                party = row['party']
                if party in partywise_spending:
                    partywise_spending[party] += amount
                else:
                    partywise_spending[party] = amount
    return partywise_spending

def plot_partywise_spending_by_state_language(df, start_date, end_date, states, languages, columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    filtered_df = df[df['languages'].isin(languages)]
    print(len(filtered_df))

    if isinstance(columns, list):
        partywise_spending = {col: calculate_partywise_spending(filtered_df, states, languages, col) for col in columns}
        partywise_df = pd.DataFrame(partywise_spending)
        partywise_df['party'] = partywise_df.index
        partywise_df = partywise_df.reset_index(drop=True)
        partywise_df = partywise_df.sort_values(by=columns[0], ascending=False).head(10)
        df_melted = partywise_df.melt(id_vars=['party'], value_vars=columns, 
                                      var_name='Spend Type', value_name='Spend Amount')
        fig = px.bar(df_melted, x='party', y='Spend Amount', color='Spend Type',
                     title=f'Party-wise Spending in {", ".join(states)} for {", ".join(languages)} Language(s)',
                     labels={'party': 'Party'},
                     category_orders={'party': partywise_df['party'].tolist()},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        partywise_spending = calculate_partywise_spending(filtered_df, states, languages, columns)
        partywise_df = pd.DataFrame(list(partywise_spending.items()), columns=['party', columns])
        partywise_df = partywise_df.sort_values(by=columns, ascending=False).head(10)
        fig = px.bar(partywise_df, x='party', y=columns,
                     title=f'Party-wise {columns} in {", ".join(states)} for {", ".join(languages)} Language(s)',
                     labels={'party': 'Party'},
                     color='party')

    fig.write_html("partywise_state_lang.html")
    # fig.show()
    return fig

def plot_age_gender_party(df, start_date, end_date, parties, genders, numerical_columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    df_filtered = df[df['party'].isin(parties)]
    print(len(df_filtered))

    # Initialize dictionary for sums
    if isinstance(numerical_columns, list):
        age_gender_sums = {col: {} for col in numerical_columns}
    else:
        age_gender_sums = {numerical_columns: {}}

    # Calculate sums for each age group and gender
    for index, row in df_filtered.iterrows():
        demographic_data = row['parsed_demographics']
        for demo in demographic_data:
            if demo['gender'] in genders:
                age_group = demo['age']
                percentage = demo['percentage']
                for col in age_gender_sums:
                    amount = row[col] * percentage
                    if age_group in age_gender_sums[col]:
                        age_gender_sums[col][age_group] += amount
                    else:
                        age_gender_sums[col][age_group] = amount

    if isinstance(numerical_columns, list):
        # Handle multiple columns
        age_gender_dfs = []
        for col in numerical_columns:
            df_col = pd.DataFrame(list(age_gender_sums[col].items()), columns=['age_group', col])
            age_gender_dfs.append(df_col)

        age_gender_df = age_gender_dfs[0].copy()
        for i in range(1, len(numerical_columns)):
            age_gender_df = age_gender_df.merge(age_gender_dfs[i], on='age_group')

        df_melted = age_gender_df.melt(id_vars='age_group', value_vars=numerical_columns, 
                                       var_name='Spend Type', value_name='sum_amount')
        fig = px.bar(df_melted, x='age_group', y='sum_amount', color='Spend Type',
                     title=f'Spending by Age Group for {", ".join(genders)} Genders by {", ".join(parties)}',
                     labels={'age_group': 'Age Group'},
                     category_orders={'age_group': sorted(age_gender_df['age_group'].unique())},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        # Handle single column
        age_gender_df = pd.DataFrame(list(age_gender_sums[numerical_columns].items()), columns=['age_group', 'sum_amount'])
        fig = px.bar(age_gender_df, x='age_group', y='sum_amount',
                     title=f'Spending by Age Group for {", ".join(genders)} Genders by {", ".join(parties)}',
                     labels={'age_group': 'Age Group'},
                     color='age_group')

    fig.write_html("partywise_age_gender.html")
    # fig.show()
    return fig


def plot_gender_age_party(df, start_date, end_date, parties, ages, numerical_columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    df_filtered = df[df['party'].isin(parties) & df['parsed_demographics'].apply(lambda x: any(demo['age'] in ages for demo in x))]
    print(len(df_filtered))

    # Initialize dictionary for sums
    if isinstance(numerical_columns, list):
        gender_group_sums = {col: {} for col in numerical_columns}
    else:
        gender_group_sums = {numerical_columns: {}}

    # Calculate sums for each gender group
    for index, row in df_filtered.iterrows():
        demographic_data = row['parsed_demographics']
        for demo in demographic_data:
            if demo['age'] in ages:
                gender = demo['gender']
                percentage = demo['percentage']
                for col in gender_group_sums:
                    amount = row[col] * percentage
                    if gender in gender_group_sums[col]:
                        gender_group_sums[col][gender] += amount
                    else:
                        gender_group_sums[col][gender] = amount

    if isinstance(numerical_columns, list):
        # Handle multiple columns
        gender_group_dfs = []
        for col in numerical_columns:
            df_col = pd.DataFrame(list(gender_group_sums[col].items()), columns=['gender', col])
            gender_group_dfs.append(df_col)

        gender_group_df = gender_group_dfs[0].copy()
        for i in range(1, len(numerical_columns)):
            gender_group_df = gender_group_df.merge(gender_group_dfs[i], on='gender')

        df_melted = gender_group_df.melt(id_vars='gender', value_vars=numerical_columns, 
                                         var_name='Spend Type', value_name='sum_amount')
        fig = px.bar(df_melted, x='gender', y='sum_amount', color='Spend Type',
                     title=f'Spending by Gender for {", ".join(ages)} Age Groups by Parties {", ".join(parties)}',
                     labels={'gender': 'Gender', 'sum_amount': 'Sum Amount'},
                     category_orders={'gender': sorted(gender_group_df['gender'].unique())},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        # Handle single column
        gender_group_df = pd.DataFrame(list(gender_group_sums[numerical_columns].items()), columns=['gender', 'sum_amount'])
        fig = px.bar(gender_group_df, x='gender', y='sum_amount',
                     title=f'Spending by Gender for {", ".join(ages)} Age Groups by Parties {", ".join(parties)}',
                     labels={'gender': 'Gender', 'sum_amount': 'Sum Amount'},
                     color='gender')

    fig.write_html("partywise_gender_age.html")
    # fig.show()
    return fig

def plot_party_sums_by_age_gender(df, start_date, end_date, ages, genders, numerical_columns):
    df = filter_ads_by_date_range(df, start_date, end_date)
    party_sums = {col: {} for col in (numerical_columns if isinstance(numerical_columns, list) else [numerical_columns])}

    # Calculate sums for each party across multiple age groups and genders
    for index, row in df.iterrows():
        if row['party'] is not None:
            demographic_data = row['parsed_demographics']
            for demo in demographic_data:
                if demo['age'] in ages and demo['gender'] in genders:
                    party = row['party']
                    percentage = demo['percentage']
                    for col in party_sums:
                        amount = row[col] * percentage
                        if party in party_sums[col]:
                            party_sums[col][party] += amount
                        else:
                            party_sums[col][party] = amount

    if isinstance(numerical_columns, list):
        # Handle multiple columns
        party_sums_dfs = []
        for col in numerical_columns:
            df_col = pd.DataFrame(list(party_sums[col].items()), columns=['party', col])
            party_sums_dfs.append(df_col)

        party_sums_df = party_sums_dfs[0].copy()
        for i in range(1, len(numerical_columns)):
            party_sums_df = party_sums_df.merge(party_sums_dfs[i], on='party')

        party_sums_df = party_sums_df.sort_values(by=numerical_columns[0], ascending=False).head(10)
        df_melted = party_sums_df.melt(id_vars='party', value_vars=numerical_columns, 
                                       var_name='Spend Type', value_name='sum_amount')
        fig = px.bar(df_melted, x='party', y='sum_amount', color='Spend Type',
                     title=f'Spending by Party for {", ".join(ages)} Age Groups and {", ".join(genders)} Genders',
                     labels={'party': 'Party', 'sum_amount': 'Sum Amount'},
                     category_orders={'party': party_sums_df['party'].tolist()},
                     color_discrete_sequence=px.colors.qualitative.Plotly)
    else:
        # Handle single column
        party_sums_df = pd.DataFrame(list(party_sums[numerical_columns].items()), columns=['party', 'sum_amount'])
        party_sums_df = party_sums_df.sort_values(by='sum_amount', ascending=False).head(10)
        fig = px.bar(party_sums_df, x='party', y='sum_amount',
                     title=f'Spending by Party for {", ".join(ages)} Age Groups and {", ".join(genders)} Genders',
                     labels={'party': 'Party', 'sum_amount': 'Sum Amount'},
                     color='party')

    fig.write_html("age_gender_party.html")
    # fig.show()
    return fig
