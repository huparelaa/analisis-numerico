from flask import Blueprint, request, jsonify
from app.matlab import run_hello_world

api = Blueprint('api', __name__)

@api.route('/hello', methods=['GET'])
def hello_world():
    return jsonify(run_hello_world())