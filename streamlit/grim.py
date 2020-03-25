import streamlit as st
# To make things easier later, we're also importing numpy and pandas for
# working with sample data.
import numpy as np
import pandas as pd
import time
import json
import random

from sklearn.model_selection import train_test_split
import sys, argparse, logging

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor  # get the model
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.model_selection import GridSearchCV
import sklearn.metrics
import pickle
import heal
import rf_reg

st.title('Grimoire')

#lets do heal data function here
#upload a csv and turn into a pd

st.markdown('**Choose Mana**')

uploaded_file = st.file_uploader("Choose a CSV file", type="csv")

if uploaded_file is not None:
    # run grimorie
    healed_data = heal.spell(uploaded_file)
    rf_reg.spell(healed_data)




