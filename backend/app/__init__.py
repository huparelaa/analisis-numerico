from flask import Flask
from app.routes_non_linear import api_non_linear
from app.routes_linear import api_linear
from app.routes_interpolation import api_interpolation
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.register_blueprint(api_non_linear, url_prefix='/non-linear')
app.register_blueprint(api_linear, url_prefix='/linear')
app.register_blueprint(api_interpolation, url_prefix='/interpolation')

if __name__ == '__main__':
    app.run()