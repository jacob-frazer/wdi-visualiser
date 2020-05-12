import flask
from flask import request, jsonify

import requests

import ml_modeller

app = flask.Flask(__name__)
app.config["DEBUG"] = True

node_url = "http://localhost:4000"

@app.route('/ml', methods=['POST'])
def run_ml():
    ''' entry point for submitting the ml params via rest - this calls the python script to run ML on it
    '''
    model_details = request.get_json(force=True)
    model = ml_modeller.run(model_details)

    return model

app.run(debug=True, port=5000)