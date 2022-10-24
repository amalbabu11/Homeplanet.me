"""
Initial server file.
"""
import json
import os
import random
import sys

import flask
from flask import request

import utils

sys.path.append(os.path.abspath(".."))

HOST = "0.0.0.0"
PORT = 8000

app: flask.Flask = flask.Flask(__name__)

return_header = {"Content-Type": "application/json"}


@app.route("/", methods=["GET"])
def index() -> str:
    """
    This api is just used for test. :)
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
    ret = utils.get_moon_by_name(name)
    return json.dumps(ret), 200, return_header


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
    planet = utils.get_planet_by_name(name)
    return json.dumps(planet), 200, return_header


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
    star = utils.get_star_by_name(name)
    return json.dumps(star), 200, return_header


@app.route("/recommand/moon", methods=["GET"])
def recommand_moon() -> tuple[str, int]:
    """
    This api returns recommendations based on the moon. For the moon it returns a random star
     and a random planet.
    ret:    `json`, the basic information of recommanded star and planet
            `status_code`, the status code of this reply
    """
    moon: str = request.args.get("moon")
    if not moon:
        return 'Cannot find argument "moon". Please check your request.', 404
    star: dict = random.choice(utils.get_star())
    planet: dict = random.choice(utils.get_planet())
    ret: dict = {"star": star, "planet": planet}
    return json.dumps(ret), 200, return_header


@app.route("/recommand/planet", methods=["GET"])
def recommand_planets() -> tuple[str, int]:
    """
    This api returns recommendations based on the planet. For the planet, it searches for an
     available star and randomly recommends a moon based on the galaxy it is in.
    ret:    `json`, the basic information of recommanded star and moon
            `status_code`, the status code of this reply
    """
    planet: str = request.args.get("planet")
    if not planet:
        return 'Cannot find argument "planet". Please check your request.', 404
    star: dict = random.choice(utils.get_star())
    moon: dict = random.choice(utils.get_moon())
    ret: dict = {"star": star, "moon": moon}
    return json.dumps(ret), 200, return_header


@app.route("/recommand/star", methods=["GET"])
def recommand_stars() -> tuple[str, int]:
    """
    This api returns recommendations based on the star. For the star, it searches for planets in
     the same galaxy and randomly recommends moons.
    ret:    `json`, the basic information of recommanded planet and moon
            `status_code`, the status code of this reply
    """
    star: str = request.args.get("star")
    if not star:
        return 'Cannot find argument "star". Please check your request.', 404
    planet: dict = random.choice(utils.get_planet())
    moon: dict = random.choice(utils.get_moon())
    ret: dict = {"planet": planet, "moon": moon}
    return json.dumps(ret), 200, return_header


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
