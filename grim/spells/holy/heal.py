import pandas as pd
import sys, argparse, logging



#get data
def mana(mana_location):
    try:
        print(mana_location)
        mana = pd.read_csv(mana_location)
        return mana
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        sys.exit(-1)

#show data

def spell(mana_location):
    data = mana(mana_location)
    print("heal")
    print(data)
    return data
    