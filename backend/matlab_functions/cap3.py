import matlab.engine
import os
from utils import eval_function
from matlab_functions import formatter
import numpy as np
matlab_script_path = os.path.join(os.path.dirname(__file__), 'cap3')
eng = matlab.engine.start_matlab()
eng.addpath(matlab_script_path)


def calcular_vandermonde(x, y):
    x = np.array(x)
    y = np.array(y)

    coef_polinomio,matriz = eng.vandermonde(x, y, nargout=2)
    response = formatter.vandermonde_formatter(coef_polinomio, matriz)
    return response

def calcular_newton(x, y):
    x = np.array(x)
    y = np.array(y)

    coef_polinomio,matriz = eng.newton(x,y,nargout = 2)
    response = formatter.newton_interpol_formatter(coef_polinomio, matriz)
    return response

def calcular_lagrange(x, y):
    x = np.array(x)
    y = np.array(y)

    coef_polinomio = eng.lagrange(x,y)
    response = formatter.lagrange_formatter(coef_polinomio)
    return response

def calcular_spline(x, y, tipo):
    x = np.array(x)
    y = np.array(y)

    if tipo == 1:
        tabla = eng.spline_lineal(x,y)
    elif tipo == 2:
        tabla = eng.spline_cuadratico(x,y)
    elif tipo == 3:
        tabla = eng.spline_cubico(x,y)

    response = formatter.spline_formatter(tabla, tipo)

    return response