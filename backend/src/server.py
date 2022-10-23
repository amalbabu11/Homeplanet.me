"""
Initial server file.
"""
import os
import random
from flask import request
import flask
import sys
import json

sys.path.append(os.path.abspath("."))


app: flask.Flask = flask.Flask(__name__)


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
    from data.databasebuilder import Moon, Session

    name: str = request.args.get("name")
    if not name:
        return 'Cannot find argument "name". Please check your request.', 404
    session: Session = Session()
    ret = [
        {
            "englishName": moon.englishName,
            "density": moon.density,
            "gravity": moon.gravity,
            "aroundPlanet": moon.aroundPlanet,
            "massValue": moon.massValue,
            "massExponent": moon.massExponent,
            "volValue": moon.volValue,
            "volExponent": moon.volExponent,
        }
        for moon in session.query(Moon).filter_by(englishName=name)
    ]
    return json.dumps(ret), 200


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
    from data.databasebuilder import Star, Session

    moon: str = request.args.get("moon")
    if not moon:
        return 'Cannot find argument "moon". Please check your request.', 404
    session: Session = Session()
    star = random.choice(
        [
            {
                "star_name": star.star_name,
                "st_teff": star.st_teff,
                "st_lumclass": star.st_lumclass,
                "st_age": star.st_age,
                "st_rad": star.st_rad,
                "st_mass": star.st_mass,
                "st_logg": star.st_logg,
            }
            for star in session.query(Star).all()
        ]
    )
    ret: dict = {"star": star, "planet": ""}
    return json.dumps(ret), 200


@app.route("/recommand/planet", methods=["GET"])
def recommand_planets() -> tuple[str, int]:
    """
    This api returns recommendations based on the planet. For the planet, it searches for an available star and randomly recommends a moon based on the galaxy it is in.
    ret:    `json`, the basic information of recommanded star and moon
            `status_code`, the status code of this reply
    """
    from data.databasebuilder import Moon, Session

    planet: str = request.args.get("planet")
    if not planet:
        return 'Cannot find argument "planet". Please check your request.', 404
    session: Session = Session()
    moon: Moon = random.choice(
        [
            {
                "englishName": moon.englishName,
                "density": moon.density,
                "gravity": moon.gravity,
                "aroundPlanet": moon.aroundPlanet,
                "massValue": moon.massValue,
                "massExponent": moon.massExponent,
                "volValue": moon.volValue,
                "volExponent": moon.volExponent,
            }
            for moon in session.query(Moon).all()
        ]
    )
    ret: dict = {"star": "", "moon": moon}
    return json.dumps(ret), 200


@app.route("/recommand/star", methods=["GET"])
def recommand_stars() -> tuple[str, int]:
    """
    This api returns recommendations based on the star. For the star, it searches for planets in the same galaxy and randomly recommends moons.
    ret:    `json`, the basic information of recommanded planet and moon
            `status_code`, the status code of this reply
    """
    from data.databasebuilder import Moon, Session

    star: str = request.args.get("star")
    if not star:
        return 'Cannot find argument "star". Please check your request.', 404
    session: Session = Session()
    moon: Moon = random.choice(
        [
            {
                "englishName": moon.englishName,
                "density": moon.density,
                "gravity": moon.gravity,
                "aroundPlanet": moon.aroundPlanet,
                "massValue": moon.massValue,
                "massExponent": moon.massExponent,
                "volValue": moon.volValue,
                "volExponent": moon.volExponent,
            }
            for moon in session.query(Moon).all()
        ]
    )
    ret: dict = {"planet": "", "moon": moon}
    return json.dumps(ret), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
