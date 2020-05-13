import numpy as np
import pandas as pd
import json
import sys

# import all the various implementations of ML 
import ml_types.linear_regression as linear_regression
import ml_types.rf_classifier as rf_classifier

#print("Hopefully the start of something great :) ")

# this file will generate ML models based on whats selected in the react app and then passed to us from node
# if this model has been made before the details will be saved in mongodb and so pulled from there instead of
# calculated again :)

# local dataset location
data_path = r"C:\Programming\ml_data\world_development\WDIData.csv"

# get data into pandas df
data_df = pd.read_csv(data_path, header=0)

def run(model_details):
    # simple example of linear regression of 'adjusted net national income' by factors:
    # Adjusted savings: education expenditure (% of GNI), "Adolescents out of school (% of lower secondary school age)"
    ml_input = model_details

    # filter data to the relevant years:
    yrs = [str(i) for i in range(int(ml_input["start_year"]),int(ml_input["end_year"]))]
    d = data_df.filter(items=["Country Code", "Indicator Code"] + yrs)

    # filter data to the relevant variables:
    mlvar = [ml_input["dep_var"]] + ml_input["indep_vars"]
    d = d[d["Indicator Code"].isin(mlvar)]

    # normally if all countries we dont need to filter
    countries = ml_input["countries"]
    if len(countries) != 264:
        d = d[d["Country Code"].isin(countries)]

    # manipulate to be in more conventional format so 1 entry is a year and country and then has its values for the variables
    # drop all rows with NaN, and any columns that aren't vaules for ML
    reshaped = d.pivot(index="Country Code", columns="Indicator Code")
    df = pd.concat([reshaped[yr] for yr in yrs], ignore_index=True).dropna(axis=0, how='any')

    # "switch" statement to route to right function for each case of machine learning.
    # point string to the func it corresponds to
    ML_FUNCS_SWITCH = {
        "lin_regression": linear_regression.run,
        "rf_classifier": rf_classifier.run
    }

    # run the machine learning model with the passed in input - val returned an object of the confusion matrix/info about regression etc
    results = ML_FUNCS_SWITCH[ml_input["ml_type"]](ml_input, df)

    # process results then send back to main.py/node backend

    # send back to node - via json
    return json.dumps(results)
