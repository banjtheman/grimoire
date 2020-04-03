import pandas as pd
import numpy as np
import streamlit as st
import sys, argparse, logging
import json


def spell(spell_inputs):
    mana = spell_inputs

    df = pd.DataFrame(
        np.random.randn(1000, 2) / [50, 50] + [38.90, -77.03], columns=["lat", "lon"]
    )
    try:
        st.map(mana)
    except:
        st.error("Points are not latlong")
        st.success("Here is an example dataframe with correct values")
        st.write(df)
        st.map(df)

