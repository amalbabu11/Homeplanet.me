import flask

app = flask.Flask(__name__)


@app.route("/", methods=['GET'])
def index():
    return "Hello, welcome to homeplanet.me!"


if __name__ == "__main__":
    app.run(host='127.0.0.1', port=8000)
