from flask import Flask
from app.routes_non_linear import api_non_linear
app = Flask(__name__)
app.register_blueprint(api_non_linear, url_prefix='/non-linear')

if __name__ == '__main__':
    app.run()