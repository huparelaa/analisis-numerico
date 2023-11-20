from flask import Blueprint, request, jsonify
from matlab_functions import cap2
api_linear = Blueprint('linear', __name__)

@api_linear.route('/iterativos', methods=['POST'])
def iterativos():
    data = request.get_json()
    A = data.get('A')
    b = data.get('b')
    x0 = data.get('x0')
    niter = data.get('niter')
    tol = data.get('tol')
    norm = data.get('norm')
    l = data.get('l') # metodo a usar
    w = data.get('w') # parametro de relajacion
    tipErr = data.get('tipErr')
    result = cap2.calcular_metodos_iterativos(A, b, x0, norm, niter, tol, l, w, tipErr)
    return jsonify(result)
