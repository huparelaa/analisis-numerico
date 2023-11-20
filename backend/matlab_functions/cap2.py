from utils import eval_function
from matlab_functions import formatter
import numpy as np
from matlab_functions.global_matlab_eng import global_eng as eng
import matlab

def calcular_metodos_iterativos(A, b, x0, norm, niter, tol, metodo, w,tipErr):
    b = [np.array(b).flatten().tolist()]
    x0 = [np.array(x0).flatten().tolist()]
    
    A = matlab.double(A)
    b = matlab.double(b)
    x0 = matlab.double(x0)
    tol = matlab.double(tol)
    niter = matlab.double(niter)
    w = matlab.double(w)
    tipErr = matlab.double(tipErr)
    norm = matlab.double(norm)
    metodo = matlab.double(metodo)

    iter, x, mt, mc, radioEspectral, error, mes, mes_err = eng.metodos_iterativos(A, b, x0, tol, norm, niter, metodo, w,tipErr, nargout=8)
    print("error:",  error)
    response = formatter.metodos_iterativos_formatter(iter, x, mt, mc, radioEspectral, error, mes, mes_err)

    return response
