"""
Initial server file.
"""
import json
import flask
from flask import request

app: flask.Flask = flask.Flask(__name__)


@app.route("/", methods=["GET"])
def index() -> str:
    """
    ret:    `str`, a welcome string
    """
    return "Hello, welcome to homeplanet.me!"


@app.route("/moon", methods=["GET"])
def api_moon() -> tuple[str, int]:
    """
    This api returns all information on the assigned moon.
    ret:    `json`, related information on the assigned moon
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return 'Cannot find argument "name". Please check your request.', 404
    return f'The moon "{name}" is found.', 200


@app.route("/planet", methods=["GET"])
def api_planet() -> tuple[str, int]:
    """
    This api returns all information on the assigned planet.
    ret:    `json`, related information on the assigned planet
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return 'Cannot find argument "name". Please check your request.', 404
    return f'The planet "{name}" is found.', 200


@app.route("/star", methods=["GET"])
def api_star() -> tuple[str, int]:
    """
    This api returns all information on the assigned star.
    ret:    `json`, related information on the assigned star
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return 'Cannot find argument "name". Please check your request.', 404
    return f'The star "{name}" is found.', 200


@app.route("/recommand/moon", methods=["GET"])
def recommand_moon() -> tuple[str, int]:
    """
    This api returns recommendations based on the moon. For the moon it returns a random star and a random planet.
    ret:    `json`, the basic information of recommanded star and planet
            `status_code`, the status code of this reply
    """
    moon: str = request.args.get("moon")
    if not moon:
        return 'Cannot find argument "moon". Please check your request.', 404
    ret: dict = {"star": "", "planet": ""}
    return json.dumps(ret), 200


@app.route("/recommand/planet", methods=["GET"])
def recommand_planets() -> tuple[str, int]:
    """
    This api returns recommendations based on the planet. For the planet, it searches for an available star and randomly recommends a moon based on the galaxy it is in.
    ret:    `json`, the basic information of recommanded star and moon
            `status_code`, the status code of this reply
    """
    planet: str = request.args.get("planet")
    if not planet:
        return 'Cannot find argument "planet". Please check your request.', 404
    ret: dict = {"star": "", "moon": ""}
    return json.dumps(ret), 200


@app.route("/recommand/star", methods=["GET"])
def recommand_stars() -> tuple[str, int]:
    """
    This api returns recommendations based on the star. For the star, it searches for planets in the same galaxy and randomly recommends moons.
    ret:    `json`, the basic information of recommanded planet and moon
            `status_code`, the status code of this reply
    """
    star: str = request.args.get("star")
    if not star:
        return 'Cannot find argument "star". Please check your request.', 404
    ret: dict = {"planet": "", "moon": ""}
    return json.dumps(ret), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
