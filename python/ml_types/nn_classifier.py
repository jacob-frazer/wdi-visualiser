from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix

import numpy as np
import pandas as pd
import math

import base64
import matplotlib as plt

def run(ml_input, data):
    # data struct that will be returned to user
    results = {"type":"nn_classifier"}
    return