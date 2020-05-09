from sklearn import linear_model
import numpy as np
import pandas as pd

def run(ml_input, data):
    # data struct that will be returned to user
    results = {}

    # do any ML technique specific data manipulation (classification break into groups for instance)
    #print("The data the linear regression function has received is:")
    #print(data)

    #print("The ml_input the linear regression function has received is:")
    #print(ml_input)

    #print("----------------")
    # split into df of target values and df of predictive values
    df = pd.DataFrame(data[ml_input["indep_vars"]])
    target = pd.DataFrame(data[ml_input["dep_var"]])

    #print(df)

    #print("----------------")

    #print(target)

    #print("----------------")

    # perform the ML
    lm = linear_model.LinearRegression()
    model = lm.fit(df, target)

    # predictions (write this to something and return as output?)
    #print("Below are predictions for values and R^2 values of the model")
    predictions = lm.predict(df)
    #print(predictions)
    results["predictions"] = predictions.tolist()

    # print R^2 value
    #print( lm.score(df, target) )
    results["R Squared"] = lm.score(df, target)

    return results