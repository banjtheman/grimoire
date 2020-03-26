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
import grim
import redis
from datetime import datetime
import shutil

import glob

#gunicorn --bind 0.0.0.0:9000 --timeout 600 --workers=1 --reload wsgi &

#local redis for now
r = redis.Redis(host="localhost", port=6379, db=0)


# Setting up the Logger to show in the notebook
logLevel = logging.DEBUG

logger = logging.getLogger(__name__)

logging.basicConfig(format='%(asctime)s | %(levelname)s : %(message)s',
                     level=logLevel, stream=sys.stdout)

logger.warning('Log Level set to: {}'.format(logLevel))
logger.info("Info")

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

@application.route("/get_projects")
def get_projects():
    jsonResp = {}
    jsonResp["projects"] = []
    try:
        for key in r.scan_iter("project_*"):
           print(key)
           proj_object = json.loads(r.get(key))
           jsonResp["projects"].append(proj_object)
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
    
    return jsonify(jsonResp)


@application.route("/get_casts")
def get_casts():
    jsonResp = {}
    jsonResp["casts"] = []

    proj_name = request.args.get("project_name")
    logging.info("Project name is: " + proj_name)
    scan_key = "cast_"+proj_name+"*"
    try:
        for key in r.scan_iter(scan_key):
           print(key)
           cast_object = json.loads(r.get(key))
           jsonResp["casts"].append(cast_object)
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
    
    return jsonify(jsonResp)


@application.route("/get_project_mana")
def get_project_mana():
    jsonResp = {}
    jsonResp["sources"] = []
    
    proj_name = request.args.get("project_name")
    logging.info("Project name is: " + proj_name)
    scan_key = "mana_"+proj_name+"*"
    try:
        for key in r.scan_iter(scan_key):
           source_object = json.loads(r.get(key))
           jsonResp["sources"].append(source_object)
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
    
    return jsonify(jsonResp)

@application.route("/delete_project", methods=["GET", "DELETE"])
def delete_project():
    proj_name = request.args.get("project_name")
    logging.info("Project name is: " + proj_name)
    #obvi this can be bad.... but its your system so...
    dirName = "projects/"+proj_name
    jsonResp = {}
    try:
        shutil.rmtree(dirName)
        r.delete("project_"+proj_name)
        for key in r.scan_iter("mana_"+proj_name+"*"):
            r.delete(key)
        for key in r.scan_iter("cast_"+proj_name+"*"):
            r.delete(key)            
        jsonResp["status"] = "done"
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "failed to remove project"

    return jsonify(jsonResp)

#have api just call grim.py
@application.route("/create_project", methods=["GET", "POST"])
def create_project():
    logging.info("Init started")
    jsonResp = {}
    currentDirectory = os.getcwd()
    raw_data = request.data
    string_data = raw_data.decode("utf-8")
    json_data = json.loads(string_data)
    print("Project data is...")
    print(json_data)
    try:
        #proj_name = request.args.get("project_name")
        proj_name = json_data["name"]
        logging.info("Project name is: " + proj_name)

        proj_desc = json_data["desc"]
        logging.info("Project desc is: " + proj_desc)

        #check if key already exists
        # if r.exists(proj_name):
        #     jsonResp["error"] = "Segfault..."+str(e)

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

      # write to database
        json_data["createdAt"] = datetime.now().strftime("%m-%d-%Y %H:%M:%S")
        r.set("project_"+proj_name, json.dumps(json_data))



        

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
                jsonResp["file_name"] = file_name


                os.chdir(currentDirectory) 


                #store data in redis
                proj_key = "mana_"+mana_object["project_name"]+"_"+file_name
                
                redis_data = {}
                redis_data["file_name"] = file_name
                redis_data["cols"] = list(df.columns)
                redis_data["createdAt"] = datetime.now().strftime("%m-%d-%Y %H:%M:%S")

                print("sendt to redis")
                print(proj_key)
                print(str(redis_data))

                r.set(proj_key, json.dumps(redis_data))

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
            return jsonify(jsonResp)



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


@application.route("/create_grim", methods=["GET", "POST"])
def create_grim():
    """
    Purpose:
        Create grim
    Args/Requests:
         data = metadata needed to create grim 
    Return:
        json object with result of create
    """

    jsonResp = {}
    #HARDCODE projects dir

    data = request.data
    print("File data is...")
    print(data)
    try:
        grimoire = json.loads(data.decode('utf-8'))
        grim_path = "grimoire/"+grimoire["name"]+".json"
        grimoire["spell_path"] = grim_path

        #write the json to cast path
        with open(grim_path, 'w') as outfile:
            json.dump(grimoire, outfile)

    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
        return jsonify(jsonResp)
    
    jsonResp["status"] = "got it"
    jsonResp["grim_path"] = grim_path
    return jsonify(jsonResp)


@application.route("/launch_grim", methods=["GET", "POST"])
def launch_grim():
    """
    Purpose:
        Launch grimoire
    Args/Requests:
         data = metadata needed to cast spell 
    Return:
        json object with result of cast
    """
    data = request.data
    #hmm have streamlit run from start, and then have it just refresh
    #instead of spawning new prorcces
    grimoire = json.loads(data.decode('utf-8'))
    print(grimoire["name"])

    #run streamlit spell runner
    #basicaly we want to refresh grim_st with the grim path

    #we are just going to dump grim to grim_st.json
    with open("grim_st.json", 'w') as outfile:
        json.dump(grimoire, outfile)

    # cmd = "streamlit run grim_st.py "+grimoire["spell_path"]+" &"
    # os.system(cmd)





    jsonResp = {}
    jsonResp["status"] = "good"


    return jsonify(jsonResp)


@application.route("/cast_grim", methods=["GET", "POST"])
def cast_grim():
    """
    Purpose:
        Cast spells
    Args/Requests:
         data = metadata needed to cast spell 
    Return:
        json object with result of cast
    """

    currentDirectory = os.getcwd()
    jsonResp = {}
    #HARDCODE projects dir



    data = request.data
    print("File data is...")
    print(data)

    proj_name = request.args.get("project_name")
    print("Project name is: " + proj_name)


    mana_source = request.args.get("mana")
    print("Mana source is: " + mana_source)

    grim_path = "projects/"+proj_name



    #Run the dvc invoke path?
    grimoire = json.loads(data.decode('utf-8'))
    print(grimoire["name"])

    cast_path = grim_path+"/casts/"+grimoire["name"]+".json"
    finished_casts_json = {}

    #write the json to cast path
    with open(cast_path, 'w') as outfile:
        json.dump(grimoire, outfile)

    #cd to project
    #run dvc command
    #issue is here... we would have to copy spells to project? or have cli tool?

    #TODO: we dont want to have to copy spells to each project
    #one way is to just cp spells to the project


    try:
    	#HARDCODE TODO: refactor once we have grim cli tool
        #copy spells to grim path 
        #copy_command = "cp -r spells "+grim_path+"/spells/"
        #subprocess.call(copy_command, shell=True)

        #copy_command = "cp grim.py "+grim_path+"/"
        #subprocess.call(copy_command, shell=True)

        #change dir
        os.chdir(grim_path)
        local_casts_path = "casts/"+grimoire["name"]+".json"

        #do we even want to use dvc???? look at metaflow?
        #idea is to make a metaflow file and run that?

        #dvc_command = "dvc run -f grim.dvc -d grim.py -d "+local_casts_path+" -o casts/"+grim["name"]+"_cast_completed.json python grim.py cast "+local_casts_path
        #subprocess.call(dvc_command, shell=True)
        finished_casts_json = grim.cast(local_casts_path,mana_source)
        if "error" in finished_casts_json:
            jsonResp["error"] = finished_casts_json["error"]
            os.chdir(currentDirectory)
            return jsonify(jsonResp)


        #think about how we would capture metrics??
        #we can look at completed file, and make it here
        #grim study PATH TO COMPLETED JSON... makes metric file  

        #create dvc stuff here?
        git_command ="git add grim.dvc"
        subprocess.call(git_command, shell=True)        

        git_command = 'git commit grim.dvc -m "'+grimoire["name"]+' pipeline configured"'
        subprocess.call(git_command, shell=True)        

        dvc_command = 'dvc push'
        subprocess.call(dvc_command, shell=True)
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
        os.chdir(currentDirectory)
        return jsonify(jsonResp)


    print("loading complete cast")
    finished_casts_path = finished_casts_json["full_path"]
    time_now = finished_casts_json["time_now"]

    #so save in redis? and have a json output file as well

    with open(finished_casts_path) as json_file:
        cast = json.load(json_file)

    r.set("cast_"+proj_name+"_"+time_now, json.dumps(cast))

    jsonResp["status"] = "got it"
    jsonResp["cast"] = cast

    os.chdir(currentDirectory)

    return jsonify(jsonResp)




@application.route("/export_flask", methods=["GET", "POST"])
def export_flask():
    print("Exporting to flask")
    jsonResp = {}
    data = request.data
    print("File data is...")
    print(data)
    grimoire = json.loads(data.decode('utf-8'))



    proj_name = request.args.get("project_name")
    print("Project name is: " + proj_name)

    #make new directory
    flask_dir = "projects/"+proj_name+"/exports/flask/"
    cmd = "mkdir -p "+flask_dir
    os.system(cmd)

    #cp app_template.py to new dir
    #cp run.sh to new dir
    cp_command = "cp exports/app_template.py "+flask_dir+"app.py"
    os.system(cp_command)

    cp_command = "cp exports/run.sh "+flask_dir
    os.system(cp_command)

    #write the grim json to flask path
    cp_command = "cp "+grimoire["spell_path"]+" "+flask_dir+"grim.json"
    os.system(cp_command)

    with open(flask_dir+"completed_cast.json", 'w') as outfile:
        json.dump(grimoire, outfile)

    # replace text in app_template

    #import spells
    # from spells.SPELL_TYPE.SPELL_NAME import spell as SPELL_NAME
    # REGISTERED_SPELLS = dict ( SPELL_NAME=SPELL_NAME,)

    import_spell_text = ""
    spell_dict_text = "REGISTERED_SPELLS = dict("
    for spell in grimoire["spells"]:
        import_spell_text += "from spells."+spell["spell_type"]+"."+spell["spell_name"]+" import spell as "+spell["spell_name"]+"\n"
        spell_dict_text += spell["spell_name"]+"="+spell["spell_name"]+","
    
    spell_dict_text += ")"
    spell_dict_text = spell_dict_text.replace(",)",")")

    full_spell_insert_text = import_spell_text+spell_dict_text
    print(full_spell_insert_text)

    lines = []
    with open(flask_dir+"app.py") as infile:
        for line in infile:
            if "####### SPELL_INSERTS #######" in line:
                print("found replace")
                line = line.replace("####### SPELL_INSERTS #######", full_spell_insert_text)
            lines.append(line)
    with open(flask_dir+"app.py", 'w') as outfile:
        for line in lines:
            outfile.write(line)

    # replace text in run.sh
    #the curl string should just be spell inputs of first spell

    curl_string= "curl localhost:5000/cast"
    input_counter=0

    for spell_input in grimoire["spells"][0]["spell_inputs"]:
        if input_counter == 0:
            curl_string += "?"+spell_input+"="+grimoire["spells"][0]["spell_inputs"][spell_input]
        else:
            curl_string += "&"+spell_input+"="+grimoire["spells"][0]["spell_inputs"][spell_input]
        input_counter += 1


    lines = []
    with open(flask_dir+"run.sh") as infile:
        for line in infile:
            line = line.replace("curl localhost:5000GRIM_CURL_STRING", curl_string)
            lines.append(line)
    with open(flask_dir+"run.sh", 'w') as outfile:
        for line in lines:
            outfile.write(line)   


    # make spells dir in new_dir
    cmd = "mkdir -p "+flask_dir+"spells"
    os.system(cmd)

    #touch __init__.py
    cmd = "touch "+flask_dir+"spells/__init__.py"
    os.system(cmd)

    # copy the spells needed to new dir
    for spell in grimoire["spells"]:
        #need to make dir for spell type
        cmd = "mkdir -p "+flask_dir+"spells/"+spell["spell_type"]+"/"
        os.system(cmd)
        spell_path = "spells/"+spell["spell_type"]+"/"+spell["spell_name"]+".py"
        cp_command = "cp "+spell_path+" "+flask_dir+"spells/"+spell["spell_type"]+"/"
        os.system(cp_command)

    # merge it ( zip up new dir)
    #or maybe just tell them? link we will need nginx server for this...

    # ship it (provide dl link )
    jsonResp["status"] = "got it"
    jsonResp["location"] = flask_dir
    return jsonify(jsonResp)


@application.route("/get_grims")
def get_grims():
    """
    Purpose:
        Get grimoire json files
    Args/Requests:
         N/A
    Return:
        array of grim objects
    """	

    grim_array = []
    jsonResp = {}
    #local grim file
    for file in os.listdir("grimoire"):
        if file.endswith(".json"):
            try:
                logging.info(os.path.join("grimoire", file))
                with open(os.path.join("grimoire", file)) as json_file:
                    grim = json.load(json_file)
                    logging.info(grim)
                    grim_array.append(grim)

            except Exception as e:
                logging.info("Yikes bad error")
                logging.error(e)
                jsonResp["error"] = "Segfault..."+str(e)
                return jsonResp
    #return array
    
    jsonResp["grims"] = grim_array

    return jsonify(jsonResp)


@application.route("/get_spells")
def get_spells():
    """
    Purpose:
        Get spell json files
    Args/Requests:
         N/A
    Return:
        array of spell objects
    """	

    spells_array = []
    jsonResp = {}
    #local grim file
    #screw this just us glob to get all spell.json files in spell dir
    try:
        file_list = glob.glob("spells/**/*.json")
        print("File list:")
        print(file_list)
        for spell_json in file_list:
            with open(spell_json) as json_file:
                spell_data = json.load(json_file)
                spells_array.append(spell_data)

    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp["error"] = "Segfault..."+str(e)
        return jsonResp
    #return array

    print("Spells array:")
    print(spells_array)
    
    jsonResp["spells"] = spells_array

    return jsonify(jsonResp)




if __name__ == "__main__":
    loglevel = logging.INFO
    logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)
    application.run(host="0.0.0.0", port="9000")