from sklearn import linear_model
import numpy as np
import pandas as pd

def run(ml_input, data):
    # data struct that will be returned to user
    results = {}

    # do any ML technique specific data manipulation (classification break into groups for instance)

    # split into df of target values and df of predictive values
    df = pd.DataFrame(data[ml_input["indep_vars"]])
    target = pd.DataFrame(data[ml_input["dep_var"]])

    # perform the ML
    lm = linear_model.LinearRegression()
    model = lm.fit(df, target)

    # predictions (write this to something and return as output?)
    predictions = lm.predict(df)
    #results["predictions"] = predictions.tolist()
    results["R Squared"] = lm.score(df, target)

    return results