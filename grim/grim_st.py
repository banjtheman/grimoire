##### Grimoire Streamlit Runner #####
import streamlit as st 
import numpy as np
import pandas as pd
import time
import json
import sys, argparse, logging
from spells import REGISTERED_SPELLS

def main():  
    grim = []
    grim_path = "grim_st.json"
    with open(grim_path) as json_file:
        grim = json.load(json_file)

    print(grim["name"])
    st.title('Grimoire: '+grim["name"])
    st.markdown('## '+grim["value"])
    spell_tomb = {}
    
    if "isTest" in grim:
        hide_streamlit_style = """
            <style>
            #MainMenu {visibility: hidden;}
            footer {visibility: hidden;}
            </style>
            """
        st.markdown(hide_streamlit_style, unsafe_allow_html=True)
        st.markdown('### Using Sample Data')
        data = "../sample_data/sample.csv"
        mana = pd.read_csv(data)
        st.write(mana)
    else:
        st.markdown('### Before you can cast your spells, upload your data')
        data = st.file_uploader("Choose a CSV file", type="csv")
    spell_count = 1
    if data is not None:

        mana = pd.read_csv(data)

        for spell in grim["spells"]:
            spell_name = spell["spell_name"]
            spell_type = spell["spell_type"]
            spell_info = spell["spell_info"]
            spell_inputs = spell["spell_inputs"]
            spell_output = spell["spell_output"]
            takes_mana = spell["takes_mana"]
            for spell_input in spell_inputs.keys():
                #only add input if not in tomb
                if spell_input not in spell_tomb:
                    spell_tomb[spell_input] = spell_inputs[spell_input]
                else:
                    #spell input is in tomb, replace value
                    spell_inputs[spell_input] = spell_tomb[spell_input]

            #TODO: create markdown to show name and info
            st.markdown('## Casting spell: '+spell_type+" "+spell_name)
            st.markdown('### '+spell_info)

            #first spell must take mana as input
            if takes_mana:
                spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](mana)
            else:
                spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](spell_inputs)
            spell_count += 1

if __name__ == "__main__":
    main()