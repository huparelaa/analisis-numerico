def eval_function(eng, function_to_eval):
    f = eng.eval("str2func('@(x)" + function_to_eval + "')", nargout=1)
    return f