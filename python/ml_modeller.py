import numpy as np
import pandas as pd
import json
import sys

# import all the various implementations of ML 
import ml_types.linear_regression as linear_regression

#print("Hopefully the start of something great :) ")

# this file will generate ML models based on whats selected in the react app and then passed to us from node
# if this model has been made before the details will be saved in mongodb and so pulled from there instead of
# calculated again :)

# local dataset location
data_path = r"C:\Programming\ml_data\world_development\WDIData.csv"

# get data into pandas df
data_df = pd.read_csv(data_path, header=0)

# set up socket communication with node - set this up in a main.py so I can also explore the data in non ML ways
''' in here communicate with the nodejs backend - when it receives json over the communication it will be in format:
{
    ml_type: rf_regression/lin_regression/nn_categorisation      etc - the type of analysis they want done
    dep_var: xxx,
    indep_vars: [yyy, zzz, ...],
    ...
    anything_else: ? -- this will be various parameters define properly later
    countries to run on
    years to run over
    params for the model
}

Take this and pass it into sklearn model 
'''
# simple example of linear regression of 'adjusted net national income' by factors:
# Adjusted savings: education expenditure (% of GNI), "Adolescents out of school (% of lower secondary school age)"
ml_input = json.loads(sys.argv[1])

# filter data to the relevant years:
yrs = [str(i) for i in range(int(ml_input["start_year"]),int(ml_input["end_year"]))]
d = data_df.filter(items=["Country Code", "Indicator Code"] + yrs)

# filter data to the relevant variables:
mlvar = [ml_input["dep_var"]] + ml_input["indep_vars"]
d = d[d["Indicator Code"].isin(mlvar)]

# normally if all countries we dont need to filter
# TODO: Find how many countries there are if all are selected
countries = ml_input["countries"]
if len(countries) != 100:
    d = d[d["Country Code"].isin(countries)]

# manipulate to be in more conventional format so 1 entry is a year and country and then has its values for the variables
# drop all rows with NaN, and any columns that aren't vaules for ML
reshaped = d.pivot(index="Country Code", columns="Indicator Code")
df = pd.concat([reshaped[yr] for yr in yrs], ignore_index=True).dropna(axis=0, how='any')

# "switch" statement to route to right function for each case of machine learning.
# point string to the func it corresponds to
ML_FUNCS_SWITCH = {
    "lin_regression": linear_regression.run
}

# run the machine learning model with the passed in input - val returned an object of the confusion matrix/info about regression etc
results = ML_FUNCS_SWITCH[ml_input["ml_type"]](ml_input, df)

# process results then send back to main.py/node backend

# send back to node - via json
results = json.dumps(results)
print(results)
sys.stdout.flush()