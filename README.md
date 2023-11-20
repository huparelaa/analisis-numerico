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
Y listo, ya tienes el backend corriendo en tu computador.

## Frontend

### Instalación

Para instalar las dependencias del proyecto inicialmente debes tener instalado una versión de node no inferior a 16.20.0, entonces debes ejecutar el siguiente comando:

```bash
$ npm install
```

### Ejecución

Para ejecutar el proyecto, debes ejecutar el siguiente comando:

```bash
$ npm start
```

Y listo, ya tienes el frontend corriendo en tu computador, si accedes a la url [http://localhost:3000](http://localhost:3000) desde tu navegador, deberías ver la página de inicio del proyecto.

## Métodos disponibles

### Métodos no lineares:
✅ Bisección

✅ Punto fijo

✅ Newton-Raphson

✅ Raices múltiples

✅ Secante

✅ Regla falsa

### Métodos lineares:
🚧 Métodos iterativos (En progreso, backend listo)

### Métodos de interpolación:
❌ Vandermonde

❌ Lagrange

❌ Newton

❌ Spline