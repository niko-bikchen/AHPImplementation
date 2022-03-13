from os import path
from flask import Flask, send_from_directory


app = Flask(__name__, static_url_path="/build",
            static_folder='build')


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(path.join(app.root_path, 'build'),
                               'favicon.ico', mimetype='image/x-icon')


@app.route('/', methods=['GET'])
def getIndex() -> 'html':
    return app.send_static_file('index.html')
