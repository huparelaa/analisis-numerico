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
            err_array = np.array(err._data).tolist()  # Convertir er a una lista

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
            err_array = np.array(err._data).tolist()  # Convertir er a una lista
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
            dfm_array = np.array(dfm._data).tolist()  # Convertir xl a una lista
            d2fm_array = np.array(d2fm._data).tolist()  # Convertir xr a una lista
            err_array = np.array(error._data).tolist()  # Convertir er a una lista
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
