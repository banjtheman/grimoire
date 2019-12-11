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
    jsonResp = {}
    currentDirectory = os.getcwd()
    try:
        proj_name = request.args.get("project_name")
        logging.info("Project name is: " + proj_name)

        #global projects dir
        #HARDCODED for now...
        os.chdir("projects")

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
        os.mkdir("mana/raw")
        os.mkdir("spells")
        os.mkdir("casts")

      # make grim.ini file
        write_to_file("grim.ini", "hello") 
        jsonResp["status"] = "complete"


        

    except IndexError as e:
        logging.error("Must provide name, example...\n grim init myproj")
        jsonResp["error"] = "provide name for project"
    except FileExistsError as e:
        logging.error("Directory " + proj_name + " already exists")
        jsonResp["error"] = "project name for already exists"
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)

    #hmm dont like this os chdir biz
    os.chdir(currentDirectory)    

    return jsonify(jsonResp)


def add_mana_source(mana_object):
        logging.info("mana add started")
        jsonResp = {}
        currentDirectory = os.getcwd()
        try:
            #this should be file, we will define csv/api/db in the file

            #the ui will help create this file...
            # ui will just send the file in json form....
            mana_type = mana_object["mana_type"]
            #HARDCODED for now
            grim_path = "projects/"+mana_object["project_name"]
              

            if mana_type == "csv":
                file_name = mana_object["file_name"]  
                logging.info("CSV path")    

                #open csv?
                #move to grim repo
                os.chdir(grim_path)    

                #track csv? might only have to do this once..?
                dvc_command ="dvc remote add -d mymana mana/raw"
                subprocess.call(dvc_command, shell=True)    

                # ui will place file in mana folder?
                # and mana.json for the file

                #write out the file here
                logging.info("Writing to file: mana/" + file_name)
                write_to_file("mana/" + file_name,mana_object["content"])

                dvc_command ="dvc add mana/"+file_name
                subprocess.call(dvc_command, shell=True)    

                git_command = 'git commit .dvc/config -m "Configured mana"'
                subprocess.call(git_command, shell=True)

                #now get data
                df = pd.read_csv("mana/"+file_name)


                jsonResp["status"] = "complete" 
                jsonResp["data"] = df.to_json()
                jsonResp["cols"] = list(df.columns)


                os.chdir(currentDirectory) 

                return jsonResp
    
            if mana_type == "db":
               logging.info("DB path")
            if mana_type == "api":
               logging.info("API path")

        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            jsonResp["error"] = "Segfault..."+str(e)
            os.chdir(currentDirectory)
            return jsonResp



def parse_form_data(data):
    """
    Purpose:
        Get parse raw csv data
    Args/Requests:
         data = RAW POST data from UI
    Return:
        json object the name of csv fike, and the content of the csv
    """
    string_data = data.decode("utf-8")
    csv_data = string_data.split("Content-Type: text/csv")
    file_name = csv_data[0].split("filename=")[1].strip().replace('"', "")
    parsed_data = csv_data[1].split("\r\n\r\n------WebKitFormBoundary")[0].strip()

    parsed_data = parsed_data.rsplit("\n", 2)[0]

    csv_info = {}
    csv_info["file_name"] = file_name
    csv_info["content"] = parsed_data
    csv_info["mana_type"] = "csv"
    return csv_info


@application.route("/add_csv_mana_source", methods=["GET", "POST"])
def add_csv_mana_source():
    """
    Purpose:
        Proccess RAW csv data
    Args/Requests:
         data = raw csv data uploaded 
    Return:
        json object with name of csv file processed
    """
    data = request.data
    print("File data is...")
    print(data)

    proj_name = request.args.get("project_name")
    logging.info("Project name is: " + proj_name)

    csv_data = parse_form_data(data)
    #call mana function here...

    print("Parsed CSV is...")
    csv_data["project_name"] = proj_name
    print(csv_data)

    jsonResp = add_mana_source(csv_data)



    # print("Writing to file: " + csv_data["file_name"])

    # f = open("/tmp/" + randInt + "/" + csv_data["file_name"], "w")
    # f.write(csv_data["content"])
    # f.close()
    return jsonify(jsonResp)




if __name__ == "__main__":
    loglevel = logging.INFO
    logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)
    application.run(host="0.0.0.0", port="9000")