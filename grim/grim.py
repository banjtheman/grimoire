#!/usr/bin/env python
#

# import modules used here
import sys, argparse, logging
import os
import subprocess
import json
from spells import REGISTERED_SPELLS
from datetime import datetime


def write_to_file(filename, content):
    f = open(filename, "w")
    f.write(content)
    f.close()


def init(project_name):
    loglevel = logging.INFO
    logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)
    logging.info("Init started")
    try:
        
        logging.info("Project name is: " + project_name)

        # make project dir
        os.mkdir(project_name)

        # change to new dir
        os.chdir(project_name)

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
        sys.exit(-1)
    except FileExistsError as e:
        logging.error("Directory " + proj_name + " already exisits")
        sys.exit(-1)
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        sys.exit(-1)




def cast(cast_path,mana_source):
    loglevel = logging.INFO
    logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)    
    logging.info("cast started")
    #the cast.json is made from UI, place it in the casts folder

    try:
        path_to_spells = cast_path
        logging.info("spells path: " + path_to_spells)


        with open(path_to_spells) as json_file:
            grim = json.load(json_file)
            logging.info(grim)

            grim_name = grim["name"]
            grim_value = grim["value"]
            grim_pipeline = grim["spells"]

            #grim_path =  grim["grim_path"]

            #Cast spell
            logging.info("Running grimorie "+grim_name)
            logging.info("This grimorie is good because... "+grim_value)

            spell_tomb = {}  #for running spell

            spell_tomb_formatted = {} #what we want to show in UI
            spell_tomb_formatted["grim_name"] = grim["name"]
            spell_tomb_formatted["grim_value"] = grim["value"]
            spell_tomb_formatted["mana_source"] = mana_source
            spell_tomb_formatted["spells"] = []
            spell_tomb_formatted["spell_path"] = grim["spell_path"]

            for spell in grim_pipeline:
                logging.debug(spell)

                spell_formatted_object = {}
                
                #run first spell?
                spell_type = spell["spell_type"]
                spell_name = spell["spell_name"]
                spell_info = spell["spell_info"]
                spell_inputs = spell["spell_inputs"]
                spell_output = spell["spell_output"]

                spell_formatted_object["spell_type"] = spell_type
                spell_formatted_object["spell_name"] = spell_name
                spell_formatted_object["spell_info"] = spell_info

                for spell_input in spell_inputs.keys():
                    #only add input if not in tomb
                    if spell_input not in spell_tomb:
                        logging.debug("adding this to spelltomb : "+spell_input)
                        spell_tomb[spell_input] = spell_inputs[spell_input]
                        #spell_formatted_object["spell_input"] = spell_inputs[spell_input]
                    else:
                        #spell input is in tomb, replace value
                        spell_inputs[spell_input] = spell_tomb[spell_input]
                        #spell_formatted_object["spell_input"] = spell_tomb[spell_input]

                logging.info("Casting "+spell_type+" "+spell_name)
                logging.info(spell_info)

                    #output is equal to spell cast
                    #how do we call dvc here maybe we dont...
                spell_formatted_object["spell_inputs"] = spell_inputs   
                spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](spell_inputs)
                spell_formatted_object["spell_output"] = spell_tomb[spell_output]
                #print("Adding to spell_tomb_fomrtated")
                #print(spell_formatted_object)
                spell_tomb_formatted["spells"].append(spell_formatted_object)

            logging.info("cast complete")
            #output spell tomb?
            time_now = datetime.now().strftime("%m-%d-%Y %H:%M:%S")
            spell_tomb_formatted["timestamp"] = time_now

            #print(str(spell_tomb_formatted))
            # make grim.ini file
            finished_casts_path = "casts/"+grim_name+"_cast_completed_"+time_now+".json"

            with open(finished_casts_path, 'w' , encoding='utf-8') as f:
                   json.dump(spell_tomb_formatted, f, ensure_ascii=False, indent=4)
            #write_to_file("casts/"+grim_name+"_cast_completed.json", str(spell_tomb))

            jsonResp = {}
            jsonResp["full_path"] = finished_casts_path
            jsonResp["time_now"] = time_now
            #jsonResp["metadata"] = spell_tomb_formatted
            print("Cast from grim.py done")
            print(str(jsonResp))

            return jsonResp
    except KeyError as e:
        logging.info("Yikes key error")
        logging.error(e)
        jsonResp = {}
        jsonResp["error"] = "Key error"
        return jsonResp
    except Exception as e:
        logging.info("Yikes bad error")
        logging.error(e)
        jsonResp = {}
        jsonResp["error"] = e
        return jsonResp



def main(args, loglevel):
    logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)

    logging.info("Hello there.")
    logging.debug("Your Argument: %s" % args.argument)
    logging.debug("Your Args: %s" % args)

    # check for args?
    main_arg = args.argument[0]

    if main_arg == "init":
        logging.info("Init started")
        try:
            proj_name = args.argument[1]
            logging.info("Project name is: " + proj_name)

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
            sys.exit(-1)
        except FileExistsError as e:
            logging.error("Directory " + proj_name + " already exisits")
            sys.exit(-1)
        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            sys.exit(-1)

    elif main_arg == "mana":
        logging.info("mana started")
        try:
            action = args.argument[1]
            logging.info("Action: " + action)


            #this should be file, we will define csv/api/db in the file
            path_to_file = args.argument[2]
            if action == "add":

                #the ui will help create this file...    

                #open file
                logging.info(path_to_file)    

                #open the file
                with open(path_to_file) as json_file:
                    details = json.load(json_file)
                    logging.info(details) 

                    mana_type = details['type']
                    grim_path = details['grim_path']
                    file_name = details['file_name']    

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


    elif main_arg == "spell":
        logging.info("spell started")
        #so this will be fore making new spells now??
        # will need to rework current mapping
        try:
            spell_type = args.argument[1]
            logging.info("spell_type: " + spell_type)

            spell_action = args.argument[2]
            logging.info("spell_action: "+spell_action)

            mana_location = args.argument[3]
            logging.info("spell_action: "+spell_action)

            #get mana details, may have to make list at some point?
            #open the file
            with open(mana_location) as json_file:
                details = json.load(json_file)
                logging.info(details)
                mana_type = details['type']
                grim_path = details['grim_path']
                file_name = details['file_name']
                file_path = details['file_path']


                #different actions for types?
                if mana_type == "csv":
                    logging.info("CSV path")
                    #run spell on data?
                    REGISTERED_SPELLS[spell_action](file_path)

        except IndexError as e:
            logging.error("Must provide spell name, example...\n grim holy heal MANA_LOCATION")
            sys.exit(-1)
        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            sys.exit(-1)           


    elif main_arg == "ui":
        print("ui started")

    elif main_arg == "study":
        print("study started")


    elif main_arg == "invoke":
        logging.info("invoke started")
        try:
            path_to_spells = args.argument[1]
            logging.info("spells path: " + path_to_spells)

            with open(path_to_spells) as json_file:
                grim = json.load(json_file)
                logging.info(grim)

                grim_name = grim["name"]
                #grim_value = grim["value"]
                #grim_pipeline = grim["spells"]
                #grim_path =  grim["grim_path"]
                #this will invoke a dvc command to run the cast
                dvc_command = "dvc run -f grim.dvc -d grim.py -d "+path_to_spells+" -o casts/"+grim_name+"_cast_completed.json python grim.py cast "+path_to_spells
                subprocess.call(dvc_command, shell=True)

                #think about how we would capture metrics??
                #we can look at completed file, and make it here
                #grim study PATH TO COMPLETED JSON... makes metric file  

                #create dvc stuff here?
                git_command ="git add grim.dvc"
                subprocess.call(git_command, shell=True)        

                git_command = 'git commit grim.dvc -m "'+grim_name+' pipeline configured"'
                subprocess.call(git_command, shell=True)        

                dvc_command = 'dvc push'
                subprocess.call(dvc_command, shell=True)  

        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            sys.exit(-1)


    elif main_arg == "cast":
        logging.info("cast started")
        #the cast.json is made from UI, place it in the casts folder

        try:
            path_to_spells = args.argument[1]
            logging.info("spells path: " + path_to_spells)


            with open(path_to_spells) as json_file:
                grim = json.load(json_file)
                logging.info(grim)

                grim_name = grim["name"]
                grim_value = grim["value"]
                grim_pipeline = grim["spells"]
                #grim_path =  grim["grim_path"]

                #Cast spell
                logging.info("Running grimorie "+grim_name)
                logging.info("This grimorie is good because... "+grim_value)

                spell_tomb = {}

                for spell in grim_pipeline:
                    logging.debug(spell)
                    #run first spell?
                    spell_type = spell["spell_type"]
                    spell_name = spell["spell_name"]
                    spell_info = spell["spell_info"]
                    spell_inputs = spell["spell_inputs"]
                    spell_output = spell["spell_output"]

                    for spell_input in spell_inputs.keys():
                        #only add input if not in tomb
                        if spell_input not in spell_tomb:
                            logging.debug("adding this to spelltomb : "+spell_input)
                            spell_tomb[spell_input] = spell_inputs[spell_input]
                        else:
                            #spell input is in tomb, replace value
                            spell_inputs[spell_input] = spell_tomb[spell_input]

                    logging.info("Casting "+spell_type+" "+spell_name)
                    logging.info(spell_info)

                    #output is equal to spell cast
                    #how do we call dvc here maybe we dont...
                    spell_tomb[spell_output] = REGISTERED_SPELLS[spell_name](spell_inputs)

                logging.info("cast complete lol cats")
                #output spell tomb?

                print(spell_tomb)

                finished_casts_path = "casts/"+grim_name+"_cast_completed.json" 
                # with open(finished_casts_path, 'w' , encoding='utf-8') as f:
                #    json.dump(spell_tomb, f, ensure_ascii=False, indent=4)

                # make grim.ini file
                write_to_file("casts/"+grim_name+"_cast_completed.json", str(spell_tomb))
                


        except Exception as e:
            logging.info("Yikes bad error")
            logging.error(e)
            sys.exit(-1)   

    else:
        print("arg not recognized: \n Valid options are init, ui")
        sys.exit(-1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Does a thing to some stuff.",
        epilog="As an alternative to the commandline, params can be placed in a file, one per line, and specified on the commandline like '%(prog)s @params.conf'.",
        fromfile_prefix_chars="@",
    )
    # TODO Specify your real parameters here.
    parser.add_argument(
        "argument", help="pass ARG to the program", metavar="ARG", nargs="+"
    )
    parser.add_argument(
        "-vvv", "--verbose", help="increase output verbosity", action="store_true"
    )
    parser.add_argument("-v", "--version", help="Shows version", action="store_true")

    args = parser.parse_args()

    if args.version:
        print("this is grimorie version 0.1")
        sys.exit()

    # Setup logging
    if args.verbose:
        loglevel = logging.DEBUG
    else:
        loglevel = logging.INFO

    main(args, loglevel)
