#!/bin/sh

# script must be ran from WDI main dir currently

# start mongodb -- v important that this is first!
pm2 start mongod --name database --watch

# start python listener
cd python
export FLASK_APP=api.py
pm2 start "flask run" --name python-listener --watch
#pm2 start api.py --name python-listener --watch --interpreter=python3
cd ..

# start the node back end as service -- might be able to pass the node into path rather than cd in and out
cd node
pm2 --name web_backend start index.js --watch
cd ..

# start react front end
cd react/wdi-visualiser
pm2 serve build 2000 --spa --watch --name frontend
cd ../..

