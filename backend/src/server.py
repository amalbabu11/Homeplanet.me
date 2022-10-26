"""
Initial server file.
"""
import json
import os
import random
import sys

from flask import Flask
from flask_cors import CORS
from flask import request

import utils

sys.path.append(os.path.abspath(".."))

HOST = "0.0.0.0"
PORT = 8000

# app: flask.Flask = flask.Flask(__name__)
# flask_cors.CORS(app, supports_credentials=True)
app = Flask(__name__)
CORS(app)

error_header = {"Content-Type": "text/plain"}
return_header = {"Content-Type": "application/json"}


@app.route("/api", methods=["GET"])
def index() -> str:
    """
    This api is just used for test. :)
    ret:    `str`, a welcome string
    """
    return "Hello, welcome to homeplanet.me!"


@app.route("/api/all_moons", methods=["GET"])
def api_all_moons() -> tuple[str, int, dict]:
    """
    This api returns all information on the moon.
    ret:    `json`, related information on the assigned moon
            `status_code`, the status code of this reply
    """
    page: str = request.args.get("page")
    per_page: str = request.args.get("per_page")
    if page is None or per_page is None:
        return (
            'Cannot find argument "page" or "per_page". Please check your request.',
            404,
            error_header,
        )
    page: int = eval(page)
    per_page: int = eval(per_page)
    moons: list[dict] = utils.get_moons()
    moons_slice: list[dict] = moons[page * per_page : (page + 1) * per_page]
    ret: dict = {
        "size": len(moons_slice),
        "total_size": len(moons),
        "bodies": moons_slice,
    }
    return json.dumps(ret), 200, return_header


@app.route("/api/all_planets", methods=["GET"])
def api_all_planets() -> tuple[str, int, dict]:
    """
    This api returns all information on the planet.
    ret:    `json`, related information on the assigned planet
            `status_code`, the status code of this reply
    """
    page: str = request.args.get("page")
    per_page: str = request.args.get("per_page")
    if page is None or per_page is None:
        return (
            'Cannot find argument "page" or "per_page". Please check your request.',
            404,
            error_header,
        )
    page: int = eval(page)
    per_page: int = eval(per_page)
    planets: list[dict] = utils.get_planets()
    planets_slice: list[dict] = planets[page * per_page : (page + 1) * per_page]
    ret: dict = {
        "size": len(planets_slice),
        "total_size": len(planets),
        "bodies": planets_slice,
    }
    return json.dumps(ret), 200, return_header


@app.route("/api/all_stars", methods=["GET"])
def api_all_stars() -> tuple[str, int, dict]:
    """
    This api returns all information on the star.
    ret:    `json`, related information on the assigned star
            `status_code`, the status code of this reply
    """
    page: str = request.args.get("page")
    per_page: str = request.args.get("per_page")
    if page is None or per_page is None:
        return (
            'Cannot find argument "page" or "per_page". Please check your request.',
            404,
            error_header,
        )
    page: int = eval(page)
    per_page: int = eval(per_page)
    stars: list[dict] = utils.get_stars()
    stars_slice: list[dict] = stars[page * per_page : (page + 1) * per_page]
    ret: dict = {
        "size": len(stars_slice),
        "total_size": len(stars),
        "bodies": stars_slice,
    }
    return json.dumps(ret), 200, return_header


@app.route("/api/moon", methods=["GET"])
def api_moon() -> tuple[str, int, dict]:
    """
    This api returns all information on the assigned moon.
    ret:    `json`, related information on the assigned moon
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return (
            'Cannot find argument "name". Please check your request.',
            404,
            error_header,
        )
    ret = utils.get_moon_by_name(name)
    return json.dumps(ret), 200, return_header


@app.route("/api/planet", methods=["GET"])
def api_planet() -> tuple[str, int, dict]:
    """
    This api returns all information on the assigned planet.
    ret:    `json`, related information on the assigned planet
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return (
            'Cannot find argument "name". Please check your request.',
            404,
            error_header,
        )
    planet = utils.get_planet_by_name(name)
    return json.dumps(planet), 200, return_header


@app.route("/api/star", methods=["GET"])
def api_star() -> tuple[str, int, dict]:
    """
    This api returns all information on the assigned star.
    ret:    `json`, related information on the assigned star
            `status_code`, the status code of this reply
    """
    name: str = request.args.get("name")
    if not name:
        return (
            'Cannot find argument "name". Please check your request.',
            404,
            error_header,
        )
    star = utils.get_star_by_name(name)
    return json.dumps(star), 200, return_header


@app.route("/api/recommand/moon", methods=["GET"])
def recommand_moon() -> tuple[str, int, dict]:
    """
    This api returns recommendations based on the moon. For the moon it returns a random star
     and a random planet.
    ret:    `json`, the basic information of recommanded star and planet
            `status_code`, the status code of this reply
    """
    moon: str = request.args.get("moon")
    if not moon:
        return (
            'Cannot find argument "moon". Please check your request.',
            404,
            error_header,
        )
    star: dict = random.choice(utils.get_stars())
    planet: dict = random.choice(utils.get_planets())
    ret: dict = {"star": star, "planet": planet}
    return json.dumps(ret), 200, return_header


@app.route("/api/recommand/planet", methods=["GET"])
def recommand_planets() -> tuple[str, int, dict]:
    """
    This api returns recommendations based on the planet. For the planet, it searches for an
     available star and randomly recommends a moon based on the galaxy it is in.
    ret:    `json`, the basic information of recommanded star and moon
            `status_code`, the status code of this reply
    """
    planet: str = request.args.get("planet")
    if not planet:
        return (
            'Cannot find argument "planet". Please check your request.',
            404,
            error_header,
        )
    star: dict = random.choice(utils.get_stars())
    moon: dict = random.choice(utils.get_moons())
    ret: dict = {"star": star, "moon": moon}
    return json.dumps(ret), 200, return_header


@app.route("/api/recommand/star", methods=["GET"])
def recommand_stars() -> tuple[str, int, dict]:
    """
    This api returns recommendations based on the star. For the star, it searches for planets in
     the same galaxy and randomly recommends moons.
    ret:    `json`, the basic information of recommanded planet and moon
            `status_code`, the status code of this reply
    """
    star: str = request.args.get("star")
    if not star:
        return (
            'Cannot find argument "star". Please check your request.',
            404,
            error_header,
        )
    planet: dict = random.choice(utils.get_planets())
    moon: dict = random.choice(utils.get_moons())
    ret: dict = {"planet": planet, "moon": moon}
    return json.dumps(ret), 200, return_header


if __name__ == "__main__":
    app.run(host=HOST, port=PORT, debug=True)
