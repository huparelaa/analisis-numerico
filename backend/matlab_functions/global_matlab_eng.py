import matlab.engine
import os

# Inicialización global de MATLAB Engine
matlab_script_path_cap1 = os.path.join(os.path.dirname(__file__), 'cap1')
matlab_script_path_cap2 = os.path.join(os.path.dirname(__file__), 'cap2')
matlab_script_path_cap3 = os.path.join(os.path.dirname(__file__), 'cap3')
global_eng = matlab.engine.start_matlab()
global_eng.addpath(matlab_script_path_cap1, matlab_script_path_cap2, matlab_script_path_cap3)
