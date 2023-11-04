from flask import Blueprint, request, jsonify
from matlab_functions import cap3
api_interpolation = Blueprint('interpolation', __name__)

@api_interpolation.route('/vandermonde', methods=['POST'])
def vandermonde():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    result = cap3.calcular_vandermonde(x, y)
    return jsonify(result)

@api_interpolation.route('/newton', methods=['POST'])
def newton():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    result = cap3.calcular_newton(x, y)
    return jsonify(result)

@api_interpolation.route('/lagrange', methods=['POST'])
def lagrange():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    result = cap3.calcular_lagrange(x, y)
    return jsonify(result)

@api_interpolation.route('/spline', methods=['POST'])
def spline():
    data = request.get_json()
    x = data.get('x')
    y = data.get('y')
    tipo = data.get('tipo')
    result = cap3.calcular_spline(x, y, tipo)
    return jsonify(result)
