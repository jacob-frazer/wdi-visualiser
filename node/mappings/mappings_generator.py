import numpy as np
import pandas as pd

# get data into pandas df
data_path = r"C:\Programming\ml_data\world_development\WDIData.csv"
data_df = pd.read_csv(data_path, header=0)

# copy and paste output into appropriate file - TODO: Make this write the files directly
#for i in zip(np.unique(data_df[["Indicator Name"]].values), np.unique(data_df[["Indicator Code"]].values)):
#    print('"' + i[0] + '"' + ' : ' + '"' + i[1] + '"' + ',')

# countries
for i in zip(np.unique(data_df[["Country Name"]].values), np.unique(data_df[["Country Code"]].values)):
    print('"' + i[0] + '"' + ' : ' + '"' + i[1] + '"' + ',')