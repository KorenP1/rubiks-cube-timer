# Imports
from flask import Flask


# Constants
PORT = 8080
DIRECTORY_PATH = 'haKhulotBatYam'


app = Flask(__name__, static_folder=DIRECTORY_PATH)

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_file(path):
    return app.send_static_file(path)



def main():
    app.run(host = '0.0.0.0', port = PORT)

if __name__ == '__main__':
    main()
