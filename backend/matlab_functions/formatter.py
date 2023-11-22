import numpy as np


def biseccion_formatter(iter, ai, xm, bi, fm, err, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        if type(ai) != float:
            ai_array = np.array(ai._data).tolist()  # Convertir xl a una lista
            xm_array = np.array(xm._data).tolist()  # Convertir xr a una lista
            bi_array = np.array(bi._data).tolist()  # Convertir xu a una lista
            fm_array = np.array(fm._data).tolist()
            # Convertir er a una lista
            err_array = np.array(err._data).tolist()
            response = {
                "Iter": iter,
                "a": ai_array,
                "xm": xm_array,
                "b": bi_array,
                "fm": fm_array,
                "err": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }
        else:
            response = {
                "Iter": iter,
                "a": ai,
                "xm": xm,
                "b": bi,
                "fm": fm,
                "err": err,
                "mes": mes,
                "mes_err": mes_err,
            }
    else:
        response = {
            "mes_err": mes_err
        }

    return response


def newton_formatter(n, xn, fm, dfm, error, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        if type(xn) != float:
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()
            dfm_array = np.array(dfm._data).tolist()
            error_array = np.array(error._data).tolist()

            response = {
                "Iter": n,
                "xn": xn_array,
                "fm": fm_array,
                "dfm": dfm_array,
                "err_array": error_array,
                "mes": mes,
                "mes_err": mes_err
            }
        else:
            response = {
                "Iter": n,
                "xn": xn,
                "fm": fm,
                "dfm": dfm,
                "err_array": error,
                "mes": mes,
                "mes_err": mes_err
            }
    else:
        response = {
            "mes_err": mes_err
        }

    return response


def punto_fijo_formatter(c, xn, fm, gm, err, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        if type(xn) != float:
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            gm_array = np.array(gm._data).tolist()  # Convertir xu a una lista
            # Convertir er a una lista
            err_array = np.array(err._data).tolist()
            response = {
                "Iter": c,
                "xn": xn_array,
                "fm": fm_array,
                "gm": gm_array,
                "err": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }
        else:
            response = {
                "Iter": c,
                "xn": xn,
                "fm": fm,
                "gm": gm,
                "err": err,
                "mes": mes,
                "mes_err": mes_err,
            }
    else:
        response = {
            "mes_err": mes_err
        }

    return response


def regla_falsa_formatter(iter, ai, xm, bi, fm, err, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        if type(ai) != float:
            ai_array = np.array(ai._data).tolist()  # Convertir xl a una lista
            xm_array = np.array(xm._data).tolist()  # Convertir xr a una lista
            bi_array = np.array(bi._data).tolist()  # Convertir xu a una lista
            fm_array = np.array(fm._data).tolist()
            # Convertir er a una lista
            err_array = np.array(err._data).tolist()

            response = {
                "Iter": iter,
                "a": ai_array,
                "xm": xm_array,
                "b": bi_array,
                "fm": fm_array,
                "err": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }
        else:
            response = {
                "Iter": iter,
                "a": ai,
                "xm": xm,
                "b": bi,
                "fm": fm,
                "err": err,
                "mes": mes,
                "mes_err": mes_err,
            }
    else:
        response = {
            "mes_err": mes_err
        }

    return response


def secante_formatter(n, xn, fm, err, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        if type(xn) != float:
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            # Convertir er a una lista
            err_array = np.array(err._data).tolist()
            response = {
                "Iter": n,
                "xn": xn_array,
                "fm": fm_array,
                "err_array": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }
        else:
            response = {
                "Iter": n,
                "xn": xn,
                "fm": fm,
                "err_array": err,
                "mes": mes,
                "mes_err": mes_err,
            }
    else:
        response = {
            "mes_err": mes_err
        }
    return response


def raices_multiples_formatter(n, xn, fm, dfm, d2fm, error, mes, mes_err):
    response = {}

    if len(mes_err) == 0:
        if type(xn) != float:
            xn_array = np.array(xn._data).tolist()  # Convertir xl a una lista
            fm_array = np.array(fm._data).tolist()  # Convertir xr a una lista
            # Convertir xl a una lista
            dfm_array = np.array(dfm._data).tolist()
            # Convertir xr a una lista
            d2fm_array = np.array(d2fm._data).tolist()
            # Convertir er a una lista
            err_array = np.array(error._data).tolist()
            response = {
                "Iter": n,
                "xn": xn_array,
                "fm": fm_array,
                "dfm_array": dfm_array,
                "d2fm_array": d2fm_array,
                "err_array": err_array,
                "mes": mes,
                "mes_err": mes_err,
            }
        else:
            response = {
                "Iter": n,
                "xn": xn,
                "fm": fm,
                "dfm_array": dfm,
                "d2fm_array": d2fm,
                "err_array": error,
                "mes": mes,
                "mes_err": mes_err,
            }
    else:
        response = {
            "mes_err": mes_err
        }
    return response


def metodos_iterativos_formatter(iter, x, mt, mc, radioEspectral, error, mes, mes_err):
    response = {}
    if len(mes_err) == 0:
        x_array = np.array(x._data).tolist()
        mt_array = np.array(mt._data).tolist()  # Convertir xr a una lista
        mc_array = np.array(mc._data).tolist()  # Convertir xu a una lista
        err_array = np.array(error._data).tolist()  # Convertir er a una lista

        x_reshape = np.reshape(x_array, (-1, len(mc_array[0]))).tolist()
        mt_reshape = np.array(mt_array).reshape(
            len(mc_array[0]), len(mc_array[0]), order='F').tolist()
        response = {
            "iter": iter,
            "x": x_reshape,
            "mt": mt_reshape,
            "mc": mc_array,
            "radioEspectral": radioEspectral,
            "error": err_array,
            "mes": mes,
            "mes_err": mes_err,
        }
    else:
        response = {
            "mes_err": mes_err
        }

    return response


def vandermonde_formatter(coeficientes, matriz):
    coeficientes = np.array(coeficientes).tolist()

    matriz = np.array(matriz).tolist()
    coeficientes.reverse()

    polinomio = polinomio_creator(coeficientes)
    polinomio = polinomio.replace('[', '(')
    polinomio = polinomio.replace(']', ')')
    response = {
        "coeficientes": coeficientes,
        "matriz": matriz,
        "polinomio": polinomio
    }
    return response


def polinomio_creator(coeficientes):
    polinomio = f"{coeficientes[0]} + "
    for i in range(1, len(coeficientes)):
        polinomio += f"{coeficientes[i]} x^{i}"
        if (i < len(coeficientes)-1):
            polinomio += " + "

    return polinomio


def newton_interpol_formatter(coeficientes, matriz):

    coeficientes = np.array(coeficientes).tolist()
    tabla = np.array(matriz).tolist()

    coeficientes[0].reverse()

    polinomio = polinomio_creator(coeficientes[0])
    polinomio = polinomio.removesuffix(" + ")

    response = {
        "coeficientes": coeficientes,
        "tabla": tabla,
        "polinomio": polinomio
    }

    return response

def lagrange_formatter(coeficientes):
    coeficientes = np.array(coeficientes).tolist()
    coeficientes[0].reverse()

    polinomio = polinomio_creator(coeficientes[0])
    polinomio = polinomio.removesuffix(" + ")

    response = {
        "coeficientes": coeficientes,
        "polinomio": polinomio
    }

    return response

def spline_formatter(tabla, tipo):
    tabla = np.array(tabla).tolist()
    trazadores = tabla.copy()

    # Could be improved ----------------
    if tipo == 1:
        for i in range(len(tabla)):
            trazadores[i] = f"{tabla[i][0]}x + {tabla[i][1]}"     
    elif tipo == 2:
        for i in range(len(tabla)):
            trazadores[i] = f"{tabla[i][0]}x^2 + {tabla[i][1]}x + {tabla[i][2]}"
    elif tipo == 3:
        for i in range(len(tabla)):
            trazadores[i] = f"{tabla[i][0]}x^3 + {tabla[i][1]}x^2 + {tabla[i][2]}x + {tabla[i][3]}"

    response = {
        "tabla": tabla,
        "trazadores": trazadores
    }   

    return response