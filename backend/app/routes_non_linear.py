from flask import Blueprint, request, jsonify
from matlab_functions import cap1
api_non_linear = Blueprint('non-linear', __name__)

@api_non_linear.route('/biseccion', methods=['POST'])
def biseccion():
    data = request.get_json()
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_biseccion(f_str, a, b, niter, tol, tipErr)
    return jsonify(result)

@api_non_linear.route('/newton', methods=['POST'])
def newton():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_newton(f_str, x0, niter, tol, tipErr)
    return jsonify(result)

@api_non_linear.route('/punto_fijo', methods=['POST'])
def punto_fijo():
    data = request.get_json()
    f_str = data.get('func')
    g_str = data.get('g')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_punto_fijo(f_str, g_str, x0, tol, niter, tipErr)
    return jsonify(result)

@api_non_linear.route('/regla_falsa', methods=['POST'])
def regla_falsa():
    data = request.get_json()
    f_str = data.get('func')
    a = data.get('a')
    b = data.get('b')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_regla_falsa(f_str, a, b, niter, tol, tipErr)
    return jsonify(result)

@api_non_linear.route('/secante', methods=['POST'])
def secante():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    x1 = data.get('x1')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_secante(f_str, x0, x1, niter, tol, tipErr)
    return jsonify(result)

@api_non_linear.route('/raices_multiples', methods=['POST'])
def raices_multiples():
    data = request.get_json()
    f_str = data.get('func')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    tipErr = data.get('tipErr')
    result = cap1.calcular_raices_multiples(f_str, x0, tol, niter, tipErr)
    return jsonify(result)
