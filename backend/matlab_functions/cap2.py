from utils import eval_function
from matlab_functions import formatter
import numpy as np
from matlab_functions.global_matlab_eng import global_eng as eng


def calcular_metodos_iterativos(A, b, x0, norm, niter, tol, metodo, w=1):
    b = [np.array(b).flatten().tolist()]
    x0 = [np.array(x0).flatten().tolist()]
    iter, x, mt, mc, radioEspectral, error, mes, mes_err = calcular_metodos_iterativos(A, b, x0, tol, norm, niter, metodo, w)
    response = formatter.metodos_iterativos_formatter(iter, x, mt, mc, radioEspectral, error, mes, mes_err)

    return response
