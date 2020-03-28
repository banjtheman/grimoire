import pandas as pd
import numpy as np
import altair as alt
import streamlit as st
import sys, argparse, logging
import json


def spell(spell_inputs):
    mana = spell_inputs
    
    x_col = st.selectbox('Select x axis for heatmap',mana.columns)
    y_col = st.selectbox('Select y axis for heatmap',mana.columns)
    z_col = st.selectbox('Select z axis for heatmap',mana.columns)


    chart = alt.Chart(mana).mark_rect().encode(x=x_col+':O',y=y_col+':O',color=z_col+':Q').properties(
    title='Heatmap for '+x_col+","+y_col+","+z_col).configure_title(
    fontSize=20,
    )
    
    st.altair_chart(chart, use_container_width=True)