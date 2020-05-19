
from sklearn.ensemble import RandomForestRegressor

import numpy as np
import pandas as pd
import math

import base64
import matplotlib as plt

def run(ml_input, data):
    # data struct that will be returned to user
    results = {"type":"rf_regression"}

    # extract the ml specific params
    params = ml_input["ml_specific"]

    n_estimators = params["num_trees"]              # find this actual name

    # split into df of target values and df of predictive values
    df = pd.DataFrame(data[ml_input["indep_vars"]])
    target = pd.DataFrame(data[ml_input["dep_var"]])

    # n_estimators sub in
    rf = RandomForestRegressor(n_estimators = 1000, random_state = 42)

    # train model
    model = rf.fit(df, target)

    # predictions
    predictions = rf.predict(df)
    #results["predictions"] = predictions.tolist()
    results["R Squared"] = model.score(df, target)


    return results