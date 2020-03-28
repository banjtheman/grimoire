import pandas as pd
import numpy as np
import altair as alt
import streamlit as st
import sys, argparse, logging
import json


def spell(spell_inputs):
    mana = spell_inputs
    
    x_col = st.selectbox('Select x axis for line chart',mana.columns)
    y_col = st.selectbox('Select y axis for line chart',mana.columns)

    chart =  alt.Chart(mana).mark_line(point=True).encode(
    x=x_col,
    y=y_col,
    tooltip=list(mana.columns)
    ).interactive().properties(title='Line Chart for '+x_col+","+y_col).configure_title(
    fontSize=20,
    )
    
    st.altair_chart(chart, use_container_width=True)