"""
Build up some functions used in the `server.py`.
"""
import os
import sys


sys.path.append(os.path.abspath("."))


def get_moon() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Moon`
    """
    from data.databasebuilder import Moon, Session

    session: Session = Session()
    moons: list[dict] = [
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
    return moons


def get_moon_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Moon` with specific name
    """
    from data.databasebuilder import Moon, Session

    session: Session = Session()
    moons: list[dict] = [
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
    return moons


def get_planet() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Planet`
    """
    from data.databasebuilder import Planet, Session

    session: Session = Session()
    planets: list[dict] = [
        {
            "pl_name": planet.pl_name,
            "hostname": planet.hostname,
            "pl_masse": planet.pl_masse,
            "pl_rade": planet.pl_rade,
            "pl_dens": planet.pl_dens,
            "pl_eqt": planet.pl_eqt,
        }
        for planet in session.query(Planet).all()
    ]
    return planets


def get_planet_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Planet` with specific name
    """
    from data.databasebuilder import Planet, Session

    session: Session = Session()
    planets: list[dict] = [
        {
            "pl_name": planet.pl_name,
            "hostname": planet.hostname,
            "pl_masse": planet.pl_masse,
            "pl_rade": planet.pl_rade,
            "pl_dens": planet.pl_dens,
            "pl_eqt": planet.pl_eqt,
        }
        for planet in session.query(Planet).filter_by(pl_name=name)
    ]
    return planets


def get_star() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Star`
    """
    from data.databasebuilder import Star, Session

    session: Session = Session()
    stars: list[dict] = [
        {
            "star_name": star.star_name,
            "st_teff": star.st_teff,
            "st_lumclass": star.st_lumclass,
            "st_age": star.st_age,
            "st_rad": star.st_rad,
            "st_mass": star.st_mass,
            "st_logg": star.st_logg,
            "img": star.img,
        }
        for star in session.query(Star).all()
    ]
    return stars


def get_star_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Star` with specific name
    """
    from data.databasebuilder import Star, Session

    session: Session = Session()
    stars: list[dict] = [
        {
            "star_name": star.star_name,
            "st_teff": star.st_teff,
            "st_lumclass": star.st_lumclass,
            "st_age": star.st_age,
            "st_rad": star.st_rad,
            "st_mass": star.st_mass,
            "st_logg": star.st_logg,
            "img": star.img,
        }
        for star in session.query(Star).filter_by(star_name=name)
    ]
    return stars