from sklearn.neural_network import MLPClassifier
from sklearn.metrics import confusion_matrix
from sklearn import preprocessing

import numpy as np
import pandas as pd
import math

import base64
import matplotlib as plt

def run(ml_input, data):
    # data struct that will be returned to user
    results = {"type":"nn_classifier"}

    # extract the ml specific params
    params = ml_input["ml_specific"]

    # how many hidden layers of x nodes - currently all layers must have the same number of nodes
    hidden_layers = tuple([params["nodes_hidden_layers"] for i in range(params["hidden_layers"])])

    # split data into classifiable groups
    groups = params['num_classes']

    # split target into classifications of data
    # make copy - order - split into groups by N_entries/N-groups
    # TODO: Make it so can be split on params by value
    data = data.sort_values(by=ml_input["dep_var"])
    split_N = math.ceil(len(data)/groups)

    # scale the dataframe - do this before or after making the groupings
    x = data.values
    min_max_scaler = preprocessing.MinMaxScaler()
    x_scaled = min_max_scaler.fit_transform(x)
    data = pd.DataFrame(x_scaled, columns=data.columns)

    # change vals in df based on grouping
    for i in range(groups):
        data[ml_input["dep_var"]][i*split_N:(i+1)*split_N] = i

    # split into df of target values and df of predictive values
    df = pd.DataFrame(data[ml_input["indep_vars"]])
    target = pd.DataFrame(data[ml_input["dep_var"]])

    targ_vals = target.values.ravel()

    clf = MLPClassifier(solver='lbfgs', alpha=1e-5, hidden_layer_sizes=(5, 2), random_state=1)
    clf.fit(df, targ_vals)

    # predictions (write this to something and return as output?)
    results["accuracy"] = clf.score(df, targ_vals)


    # produce confusion matrix
    conf_matrix = confusion_matrix(targ_vals, clf.predict(df))
    results["conf_matrix"] = conf_matrix.tolist()

    return results