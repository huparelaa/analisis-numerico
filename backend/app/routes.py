from flask import Blueprint, request, jsonify
from matlab_functions import cap1
api = Blueprint('api', __name__)


@api.route('/hello', methods=['GET'])
def hello_world():
    return jsonify({"message": "Hello, World!"})


@api.route('/biseccion', methods=['POST'])
def biseccion():
    data = request.get_json()
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_biseccion(f_str, a, b, niter, tol)
    return jsonify(result)

@api.route('/newton', methods=['POST'])
def newton():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_newton(f_str, x0, niter, tol)
    return jsonify(result)

@api.route('/punto_fijo', methods=['POST'])
def punto_fijo():
    data = request.get_json()
    f_str = data.get('func')
    g_str = data.get('g')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_punto_fijo(f_str, g_str, x0, tol, niter)
    return jsonify(result)

@api.route('/regla_falsa', methods=['POST'])
def regla_falsa():
    data = request.get_json()
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_regla_falsa(f_str, a, b, niter, tol)
    return jsonify(result)

@api.route('/secante', methods=['POST'])
def secante():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    x1 = data.get('x1')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_secante(f_str, x0, x1, niter, tol)
    return jsonify(result)

@api.route('/raices_multiples', methods=['POST'])
def raices_multiples():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    result = cap1.calcular_raices_multiples(f_str, x0, tol, niter)
    return jsonify(result)
