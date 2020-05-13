from sklearn.ensemble import RandomForestClassifier
import numpy as np
import pandas as pd
import math

import base64
import matplotlib as plt

def run(ml_input, data):
    # data struct that will be returned to user
    results = {"type":"rf_classifier"}

    # do any ML technique specific data manipulation (classification break into groups for instance)
    # TODO: get ml specific params - how many classifications etc
    groups = 3

    # split target into classifications of data
    # make copy - order - split into groups by N_entries/N-groups
    # TODO: Make it so can be split on params by value
    data = data.sort_values(by=ml_input["dep_var"])
    split_N = math.ceil(len(cpy_data)/groups)

    # change vals in df based on grouping
    for i in range(groups):
        data[ml_input["dep_var"]][i*split_N:(i+1)*split_N] = i

    # split into df of target values and df of predictive values
    df = pd.DataFrame(data[ml_input["indep_vars"]])
    target = pd.DataFrame(data[ml_input["dep_var"]])

    # perform the ML
    clf = RandomForestClassifier(max_depth=2, random_state=0)
    clf.fit(df, target.values.ravel())

    # TODO: produce an image -> base64 encode it -> attach to json to display on front end
    #img_64_enc = 
    #results["img_data"] = img_64_enc

    # predictions (write this to something and return as output?)

    return results