import matlab.engine
from utils import eval_function
from matlab_functions import formatter
from matlab_functions.global_matlab_eng import global_eng as eng


def calcular_biseccion(f_str, a, b, niter, tol, tipErr):
    f = eval_function(eng, f_str)
    iter, ai, xm, bi, fm, err, mes, mes_err = eng.biseccion(f, float(a), float(b), int(niter), float(tol), matlab.double(tipErr), nargout=8)
    
    response = formatter.biseccion_formatter(iter, ai, xm, bi, fm, err, mes, mes_err)
    return response

def calcular_newton(f_str, x0, niter, tol, tipErr):
    f = eval_function(eng, f_str)

    n, xn, fm, dfm, error, mes, mes_err = eng.newton(f, matlab.double(x0), matlab.double(tol), matlab.double(niter), matlab.double(tipErr), nargout=7)
    response = formatter.newton_formatter(n, xn, fm, dfm, error, mes, mes_err)
    return response

def calcular_punto_fijo(f_str, g_str, x0, tol, niter, tipErr):
    f = eval_function(eng, f_str)
    g = eval_function(eng, g_str)
    c, xn, fm, gm, err, mes, mes_err = eng.pf(f, g, matlab.double(x0), matlab.double(tol), matlab.double(niter), matlab.double(tipErr),  nargout=7)

    response = formatter.punto_fijo_formatter(c, xn, fm, gm, err, mes, mes_err)
    return response

def calcular_regla_falsa(f_str, a, b, niter, tol, tipErr):
    f = eval_function(eng, f_str)
    iter, ai, xm, bi, fm, err, mes, mes_err  = eng.rf(f, matlab.double(a), matlab.double(b),matlab.double(niter),  matlab.double(tol), matlab.double(tipErr), nargout=8)

    response = formatter.regla_falsa_formatter(iter, ai, xm, bi, fm, err, mes, mes_err)
    return response

def calcular_secante(f_str, x0, x1, niter, tol, tipErr):
    f = eval_function(eng, f_str)
    n, xn, fm, err, mes, mes_err = eng.secante(f, matlab.double(x0), matlab.double(x1), matlab.double(tol), matlab.double(niter), matlab.double(tipErr), nargout=6)

    response = formatter.secante_formatter(n, xn, fm, err, mes, mes_err)
    return response

def calcular_raices_multiples(f_str, x0, tol, niter, tipErr):
    f = eval_function(eng, f_str)
    n, xn, fm, dfm, d2fm, error, mes, mes_err = eng.raices_multiples(f, matlab.double(x0), matlab.double(tol), matlab.double(niter), matlab.double(tipErr), nargout=8)

    response = formatter.raices_multiples_formatter(n, xn, fm, dfm, d2fm, error, mes, mes_err)
    return response