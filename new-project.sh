#!/usr/bin/env bash

# colour constants
IRed='\033[0;91m'
Colour_Off='\033[0m' 

# header
echo "Project Brown Fox"
echo -e "${IRed}@gawdn${Colour_Off}"
echo "sydney au"
echo "==================="
echo
# end header

if [[ -n "$*" ]]
then
  if ls | grep -qe ".*$*.*"
  then 
     echo "This project already exists! Try a different project name."
  else
    if ls | grep -qe "^[0-9]\b"
    then
      basePath="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
      fno=$(ls | grep -Eo "[0-9]*" | sort -rn | head -n 1)
      (( fno++ ))
      mkdir "$fno $*"
      cd "$fno $*"
      
      if echo "$*" | grep -qe ".*NOC.*"
      then
       echo "This is a Nature of Code project. Applying the NOC license."
       cat "$basePath/comment_boilerplate/noc_html_comment">index.html
       cat "$basePath/comment_boilerplate/noc_js_comment">main.js
      else
       cat "$basePath/comment_boilerplate/generic_html_comment">index.html
       cat "$basePath/comment_boilerplate/generic_js_comment">main.js
      fi
      echo "Made a project directory with name $fno $*."
      atom "$basePath"
    else   
      echo "There appears to be missing project files. Make a folder with the format number[SPACE]Project name to continue"
    fi
  fi
else
    echo "The was no project name given. Give a project name."
fi

