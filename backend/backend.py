#!/usr/bin/python3

import os
import sys
import json

from flask import Flask, request, redirect, url_for, send_from_directory, session, render_template
app = Flask(__name__)
app.secret_key = "changeit"
app.debug = True

#-----------------------------

scriptDir = os.path.dirname(os.path.realpath(__file__))

#-----------------------------

#@app.before_request
#def init_sessions():
    #session['workdir'] = False
#    session.permanent = True

#-------------------------------------------------------------------------

@app.route('/', methods=['GET']) 
def root():
    return 'welcome to the tables backend api'


@app.route('/api/<table>', methods=['GET']) 
def table_get(table):

    tableObj = {}
    tableObj["defi"] = []
    tableObj["data"] = []

    try:
        defiFileObj = open('defi/'+table+'.json')
        dataFileObj = open('data/'+table+'.json')
        
        defiFileStr = defiFileObj.read()
        dataFileStr = dataFileObj.read()

        defiObj = json.loads(defiFileStr)
        dataObj = json.loads(dataFileStr)

    except Exception as e: 
        print(e)
        return 'gehderned', 404

    tableObj["defi"] = defiObj
    tableObj["data"] = dataObj

    jsonOut = json.dumps(tableObj, indent=2)

    #-----------------------------
    response = app.response_class(
        response=jsonOut,
        status=200,
        mimetype='application/json'
    )
    return response


#-------------------------------------------------------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

#-------------------------------------------------------------------------