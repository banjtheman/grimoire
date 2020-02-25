"""
  app.py
    Purpose:
        API layer for your Spells
"""

# Python Library Imports
from flask import Flask
from flask import request
from flask_cors import CORS
from flask import jsonify
import json


####### SPELL_INSERTS #######
# from spells.SPELL_TYPE.SPELL_NAME import spell as SPELL_NAME
# REGISTERED_SPELLS = dict ( SPELL_NAME=SPELL_NAME,)


application = Flask(__name__)
CORS(application)


@application.route("/health")
def health():
    return jsonify({"healthy": "true"})


@application.route("/cast")
def cast():
    #we check the spell inputs for first spell, and make thoose required parms??

    #We will have a placholder like GRIM_NAME, and replace it with actual value
    #could also just pass in so can run any grim, but we dont want to import every spell
    with open(GRIM_NAME) as json_file:
        grim = json.load(json_file)
        

    #check keys for spell_inputs for grim["spells"][0]
    first_spell = grim["spells"][0]
    spell_inpts = {}

    for spell_input in grim["spells"][0]["spell_inputs"].keys():
        first_spell["spell_inputs"][spell_input] = request.args.get(spell_input)
        print("Got " + str(spell_input) + ": "+first_spell["spell_inputs"][spell_input] )

    spell_tomb = {}

    for spell in grim["spells"]:
        #now cast the spell

        #spell name
        # print(spell["spell_inputs"])
        # spell["spell_output"] = REGISTERED_SPELLS[spell["spell_name"]](spell["spell_inputs"])
        spell_type = spell["spell_type"]
        spell_name = spell["spell_name"]
        spell_info = spell["spell_info"]
        spell_inputs = spell["spell_inputs"]
        spell_output = spell["spell_output"]

        for spell_input in spell_inputs.keys():
            #only add input if not in tomb
            if spell_input not in spell_tomb:
                #logging.debug("adding this to spelltomb : "+spell_input)
                spell_tomb[spell_input] = spell_inputs[spell_input]
            else:
                #spell input is in tomb, replace value
                spell_inputs[spell_input] = spell_tomb[spell_input]

                #logging.info("Casting "+spell_type+" "+spell_name)
                #logging.info(spell_info)

                #output is equal to spell cast
                #how do we call dvc here maybe we dont...
        spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](spell_inputs)
        spell["spell_output"] = spell_tomb[spell_output]

    return jsonify(spell_tomb)


if __name__ == "__main__":
    application.run(host="0.0.0.0", port="5000")


