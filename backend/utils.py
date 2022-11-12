"""
Build up some functions used in the `server.py`.
"""
import os
import sys


sys.path.append(os.path.abspath(".."))


def get_moons() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Moon`
    """
    from data.databasebuilder import Moon, Session

    session: Session = Session()
    moons: list[dict] = [
        {
            "index": moon.index,
            "englishName": moon.englishName,
            "density": moon.density,
            "gravity": moon.gravity,
            "aroundPlanet": moon.aroundPlanet,
            "massValue": moon.massValue,
            "massExponent": moon.massExponent,
            "volValue": moon.volValue,
            "volExponent": moon.volExponent,
            "img": moon.img,
        }
        for moon in session.query(Moon).all()
    ]
    session.close()
    return moons


def get_moon_by_index(index: int) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Moon` with specific name
    """
    from data.databasebuilder import Moon, Session

    session: Session = Session()
    moons: list[dict] = [
        {
            "index": moon.index,
            "englishName": moon.englishName,
            "density": moon.density,
            "gravity": moon.gravity,
            "aroundPlanet": moon.aroundPlanet,
            "massValue": moon.massValue,
            "massExponent": moon.massExponent,
            "volValue": moon.volValue,
            "volExponent": moon.volExponent,
            "img": moon.img,
        }
        for moon in session.query(Moon).filter(Moon.index == index)
    ]
    session.close()
    return moons


def get_moon_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Moon` with specific name
    """
    from data.databasebuilder import Moon, Session

    session: Session = Session()
    moons: list[dict] = [
        {
            "index": moon.index,
            "englishName": moon.englishName,
            "density": moon.density if moon.density else 0,
            "gravity": moon.gravity if moon.gravity else 0,
            "aroundPlanet": moon.aroundPlanet if moon.aroundPlanet else "",
            "massValue": moon.massValue if moon.massValue else 0,
            "massExponent": moon.massExponent if moon.massExponent else 0,
            "volValue": moon.volValue if moon.volValue else 0,
            "volExponent": moon.volExponent if moon.volExponent else 0,
            "img": moon.img,
        }
        for moon in session.query(Moon).filter(Moon.englishName.contains(name))
    ]
    session.close()
    return moons


def get_planets() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Planet`
    """
    from data.databasebuilder import Planet, Session

    session: Session = Session()
    planets: list[dict] = [
        {
            "index": planet.index,
            "pl_name": planet.pl_name,
            "hostname": planet.hostname,
            "pl_masse": planet.pl_masse if planet.pl_masse else 0,
            "pl_rade": planet.pl_rade if planet.pl_rade else 0,
            "pl_dens": planet.pl_dens if planet.pl_dens else 0,
            "pl_eqt": planet.pl_eqt if planet.pl_eqt else 0,
            "img": planet.img,
            "orbit_img": planet.orbit_img,
        }
        for planet in session.query(Planet).all()
    ]
    session.close()
    return planets


def get_planet_by_index(index: int) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Planet` with specific name
    """
    from data.databasebuilder import Planet, Session

    session: Session = Session()
    planets: list[dict] = [
        {
            "index": planet.index,
            "pl_name": planet.pl_name,
            "hostname": planet.hostname,
            "pl_masse": planet.pl_masse,
            "pl_rade": planet.pl_rade,
            "pl_dens": planet.pl_dens,
            "pl_eqt": planet.pl_eqt,
            "img": planet.img,
            "orbit_img": planet.orbit_img,
        }
        for planet in session.query(Planet).filter(Planet.index == index)
    ]
    session.close()
    return planets


def get_planet_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Planet` with specific name
    """
    from data.databasebuilder import Planet, Session

    session: Session = Session()
    planets: list[dict] = [
        {
            "index": planet.index,
            "pl_name": planet.pl_name,
            "hostname": planet.hostname,
            "pl_masse": planet.pl_masse,
            "pl_rade": planet.pl_rade,
            "pl_dens": planet.pl_dens,
            "pl_eqt": planet.pl_eqt,
            "img": planet.img,
            "orbit_img": planet.orbit_img,
        }
        for planet in session.query(Planet).filter(Planet.pl_name.contains(name))
    ]
    session.close()
    return planets


def get_stars() -> list[dict]:
    """
    ret: `list[dict]`, all data in the table `Star`
    """
    from data.databasebuilder import Star, Session

    session: Session = Session()
    stars: list[dict] = [
        {
            "index": star.index,
            "star_name": star.star_name,
            "st_teff": star.st_teff if star.st_teff else 0,
            "st_lumclass": star.st_lumclass if star.st_lumclass else "",
            "st_age": star.st_age if star.st_age else 0,
            "st_rad": star.st_rad if star.st_rad else 0,
            "st_mass": star.st_mass if star.st_mass else 0,
            "st_logg": star.st_logg if star.st_logg else 0,
            "img": star.img,
            "color": star.color if star.color else "",
        }
        for star in session.query(Star).all()
    ]
    session.close()
    return stars


def get_star_by_index(index: str):
    """
    ret: `list[dict]`, data in the table `Star` with specific name
    """
    from data.databasebuilder import Star, Session

    session: Session = Session()
    stars = [
        {
            "index": star.index,
            "star_name": star.star_name,
            "st_teff": star.st_teff,
            "st_lumclass": star.st_lumclass,
            "st_age": star.st_age,
            "st_rad": star.st_rad,
            "st_mass": star.st_mass,
            "st_logg": star.st_logg,
            "img": star.img,
            "color": star.color,
        }
        for star in session.query(Star).filter(Star.index == index)
    ]
    session.close()
    return stars


def get_star_by_name(name: str) -> list[dict]:
    """
    ret: `list[dict]`, data in the table `Star` with specific name
    """
    from data.databasebuilder import Star, Session

    session: Session = Session()
    stars = [
        {
            "index": star.index,
            "star_name": star.star_name,
            "st_teff": star.st_teff,
            "st_lumclass": star.st_lumclass,
            "st_age": star.st_age,
            "st_rad": star.st_rad,
            "st_mass": star.st_mass,
            "st_logg": star.st_logg,
            "img": star.img,
            "color": star.color,
        }
        for star in session.query(Star).filter(Star.star_name.contains(name))
    ]
    session.close()
    return stars
