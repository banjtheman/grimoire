#!/usr/bin/env python
#

# import modules used here
import sys, argparse, logging
import os
import subprocess
import json
from spells import REGISTERED_SPELLS

def write_to_file(filename, content):
    f = open(filename, "w")
    f.write(content)
    f.close()


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
