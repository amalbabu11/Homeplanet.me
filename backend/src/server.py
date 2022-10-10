"""
Initial server file.
"""
import flask

app: flask.Flask = flask.Flask(__name__)


@app.route("/", methods=["GET"])
def index() -> str:
    """
    ret: `str`, a welcome string
    """
    return "Hello, welcome to homeplanet.me!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
