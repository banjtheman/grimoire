#!/usr/bin/env python
#

# import modules used here
import sys, argparse, logging
import os
import subprocess



def write_to_file(filename, content):
    f = open(filename, "w")
    f.write(content)
    f.close()

def main(args, loglevel):
  logging.basicConfig(format="%(levelname)s: %(message)s", level=loglevel)
  
  logging.info("Hello there.")
  logging.debug("Your Argument: %s" % args.argument)
  logging.debug("Your Args: %s" % args)

  #check for args?
  main_arg = args.argument[0]

  if main_arg == "init":
    print("Init started")
    try:
        proj_name = args.argument[1]
        logging.info("Project name is: " +proj_name)

        #make project dir
        os.mkdir(proj_name)

        #change to new dir
        os.chdir(proj_name)

        #init git
        cmd = "git init"
        subprocess.call(cmd, shell=True)

        #init dvc
        cmd = "dvc init"
        subprocess.call(cmd, shell=True)

        #make directories
        os.mkdir("mana")
        os.mkdir("spells")
        os.mkdir("casts")

        #make grim.ini file
        write_to_file("grim.ini","hello")


    except IndexError as e:
         logging.error("Must provide name, example...\n grim init myproj")
         sys.exit(-1)
    except FileExistsError as e:
         logging.error("Directory "+proj_name+" already exisits")
         sys.exit(-1)         
    except Exception as e:
         logging.info("Yikes bad error")
         logging.error(e)
         sys.exit(-1)


  if main_arg == "data":
    print("data started")

  if main_arg == "ui":
    print("ui started")



  print("arg not recognized: \n Valid options are init, ui")

 
if __name__ == '__main__':
  parser = argparse.ArgumentParser( 
                                    description = "Does a thing to some stuff.",
                                    epilog = "As an alternative to the commandline, params can be placed in a file, one per line, and specified on the commandline like '%(prog)s @params.conf'.",
                                    fromfile_prefix_chars = '@' )
  # TODO Specify your real parameters here.
  parser.add_argument(
                      "argument",
                      help = "pass ARG to the program",
                      metavar = "ARG",
                      nargs='+')
  parser.add_argument(
                      "-vvv",
                      "--verbose",
                      help="increase output verbosity",
                      action="store_true")
  parser.add_argument(
                      "-v",
                      "--version",
                      help="Shows version",
                      action="store_true")


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