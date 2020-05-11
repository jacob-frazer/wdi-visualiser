import numpy as np
import pandas as pd
import os

# get data into pandas df
data_path = r"C:\Programming\ml_data\world_development\WDIData.csv"
data_df = pd.read_csv(data_path, header=0)

# TODO: Delete final comma from end programatically
with open('./indicatorCodes.json', "w") as fh:
    fh.write('{ \r')
    for i in list(zip(data_df["Indicator Name"].unique(), data_df["Indicator Code"].unique())):
        fh.write('"' + i[0] + '"' + ' : ' + '"' + i[1] + '"' + ',')
        fh.write('\r')
    fh.write('}')

# countries
with open('./countryCodes.json', "w") as fh:
    fh.write('{ \r')
    for i in list(zip(data_df["Country Name"].unique(), data_df["Country Code"].unique())):
        fh.write('"' + i[0] + '"' + ' : ' + '"' + i[1] + '"' + ',')
        fh.write('\r')
    fh.write('}')