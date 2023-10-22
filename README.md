# Proyecto análisis numérico

## Backend

### Instalación

Al estar este proyecto utilizando matlab primero debes instalar este mismo en tu computador asegurándote que en tu PATH esté correctamente incluido el ejecutable de matlab. Debería ser algo como esto:

```bash
$ which matlab
/usr/local/MATLAB/R2023b/bin/matlab
```

o donde sea que lo hayas instalado.

Luego, para instalar las dependencias del proyecto, debes ejecutar el siguiente comando:

```bash
$ pip install -r requirements.txt
```

### Ejecución
Ahora simplemente debes ejecutar el siguiente comando:

```bash
$ python run.py
```
Y listo, ya tienes el backend corriendo en tu computador, si accedes a la url [http://localhost:5000/api/hello](http://localhost:5000/api/hello) desde una herramienta como postman o simplemente desde tu navegador, deberías ver un mensaje de bienvenida.