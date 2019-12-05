from flask import Flask
from flask import request
from flask_cors import CORS
import os
import json
import random
import time
import pandas as pd, numpy as np
import csv
import subprocess
import sys, argparse, logging
from spells import REGISTERED_SPELLS

from flask import jsonify 


#gunicorn --bind 0.0.0.0:9000 --timeout 600 --workers=1 --reload wsgi &

application = Flask(__name__)
CORS(application)



def write_to_file(filename, content):
    f = open(filename, "w")
    f.write(content)
    f.close()


@application.route("/health")
def health():
    jsonResp = {}
    jsonResp["healthy"] = "true"


    return jsonify(jsonResp)



#have api just call grim.py
@application.route("/create_project")
def create_project():
    logging.info("Init started")
    try:
        proj_name = request.args.get("project_name")
        logging.info("Project name is: " + proj_name)

        #global projects dir
        os.chdir("/projects")

      # make project dir
        os.mkdir(proj_name)

      # change to new dir
        os.chdir(proj_name)

      # init git
        cmd = "git init"
        subprocess.call(cmd, shell=True)

      # init dvc
        cmd = "dvc init"
        subprocess.call(cmd, shell=True)

      # make directories
        os.mkdir("mana")
        os.mkdir("spells")
        os.mkdir("casts")

      # make grim.ini file
        write_to_file("grim.ini", "hello")

    except IndexError as e:
        logging.error("Must provide name, example...\n grim init myproj")
    except FileExistsError as e:
        logging.error("Directory " + proj_name + " already exisits")
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)



def add_mana_source():
        logging.info("mana add started")
        try:
            #this should be file, we will define csv/api/db in the file
            #path_to_file = request.args.get("project_name")

            #the ui will help create this file...
            # ui will just send the file in json form....   
 
            #open the file
 
            mana_type = request.args.get("mana_type")
            grim_path = request.args.get("project_path")
            file_name = request.args.get("file_name")    

            if mana_type == "csv":
                logging.info("CSV path")    

                        #open csv?
                        #move to grim repo
                os.chdir(grim_path)    

                #track csv?
                dvc_command ="dvc remote add -d mymana mana"
                subprocess.call(dvc_command, shell=True)    

                # ui will place file in mana folder?
                # and mana.json for the file

                dvc_command ="dvc add mana/"+file_name
                subprocess.call(dvc_command, shell=True)    

                git_command = 'git commit .dvc/config -m "Configured mana"'
                subprocess.call(git_command, shell=True)    
    
            if mana_type == "db":
               logging.info("DB path")
            if mana_type == "api":
               logging.info("API path")

        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            sys.exit(-1)

if __name__ == "__main__":
    application.run(host="0.0.0.0", port="9000")