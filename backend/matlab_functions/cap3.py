
from utils import eval_function
from matlab_functions import formatter
import numpy as np
from matlab_functions.global_matlab_eng import global_eng as eng

def calcular_vandermonde(x, y):
    x = np.array(x)
    y = np.array(y)

    coef_polinomio,matriz = eng.vandermonde(x, y, nargout=2)
    response = formatter.vandermonde_formatter(coef_polinomio, matriz)
    return response

def calcular_newton(x, y):
    x = np.array(x)
    y = np.array(y)

    matriz, coef_polinomio = eng.newtonint(x,y,nargout = 2)
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
        tabla = eng.spline_cuadrado(x,y)
    elif tipo == 3:
        tabla = eng.spline_cubico(x,y)

    response = formatter.spline_formatter(tabla, tipo)

    return response