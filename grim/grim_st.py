import streamlit as st
# To make things easier later, we're also importing numpy and pandas for
# working with sample data.
import numpy as np
import pandas as pd
import time
import json
import sys, argparse, logging
from spells import REGISTERED_SPELLS



def main():

    #grim_path=sys.argv[1]

   
    grim = []

    #load json
    grim_path = "grim_st.json"
    
    with open(grim_path) as json_file:
        grim = json.load(json_file)


    #run spells
    print(grim["name"])
    st.title('Grimoire: '+grim["name"])
    st.markdown('## '+grim["value"])

    spell_tomb = {}
    


    st.markdown('### Before you can cast your spells, upload your data')

    # st.markdown('**Choose Mana**')
    #will add support for db and api later
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
            #print(spell_name)

            for spell_input in spell_inputs.keys():
                #only add input if not in tomb
                if spell_input not in spell_tomb:
                    #print("adding this to spelltomb : "+spell_input)
                    spell_tomb[spell_input] = spell_inputs[spell_input]
                else:
                    #spell input is in tomb, replace value
                    spell_inputs[spell_input] = spell_tomb[spell_input]

                #print("Casting "+spell_type+" "+spell_name)
                #print(spell_info)


            #TODO: create markdown to show name and info
            st.markdown('## Casting spell: '+spell_type+" "+spell_name)
            st.markdown('### '+spell_info)

            # st.write(spell_type+" "+spell_name)
            # st.write(spell_info)
            #first spell must take mana as input
            if takes_mana:
                spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](mana)
            else:
                spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](spell_inputs)
            spell_count += 1




if __name__ == "__main__":
    main()