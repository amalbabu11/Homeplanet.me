import pandas as pd
import json
import requests
from io import StringIO


""" get response in the form of a dict

:param request_url: the url we are sending a request to
:param: headers: any headers which may be needed for the request
"""


def get_response_dict(request_url, headers=None):
    response = requests.get(request_url, headers=headers)

    if response.status_code == requests.codes.ok:
        data = json.loads(response.text)
        return data
    else:
        print("Error:", response.status_code, response.text)
        return


"""requests planet data from api and returns in the form of a dict

:returns: a dictionary of planet data for each planet in out solar system
"""


def get_planet_data():
    with open("keys.txt", "r") as f:
        my_key = f.read()
    planet_url = "https://api.api-ninjas.com/v1/planets?"

    # only keep planets in our solar system
    criteria = "max_distance_light_year=0.5"
    # get request data
    data = get_response_dict(planet_url + criteria,
                             headers={"X-Api-Key": my_key})

    # create dataframe with values
    return data


""" obtains moon data of each planet, modifies planet_data in place

:param planet_data: the dictionary returned by get_planet_data
:returns: a dictionary of moon data for each planet in planet_date
"""


def get_moon_data(planet_data):
    # list of all planets
    # api url
    url = "https://api.le-systeme-solaire.net/rest/bodies/"
    moon_data = []
    moon_data = []
    for planet in planet_data:

        planet_name = planet["name"]
        body = f"{{{planet_name}}}"

        data = get_response_dict(url + body)
        if data["moons"] is not None:
            planet["moons"] = []
            for moon in data["moons"]:
                planet["moons"].append(moon["moon"])
                moon_data.append(get_response_dict(moon["rel"]))
    return moon_data


""" Returns a dict with information about stars in our solar system

:return: a dictionary containing data about stars in our solar system
"""


def get_star_data():
    url = "https://api.le-systeme-solaire.net/rest/bodies/soleil"

    star_data = []
    star_data.append(get_response_dict(url))
    return star_data


""" 
Writes to a json file with information about stars outside our solar system
"""


def write_exostar_data():
    url = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=missionstars&select=star_name,st_teff,st_lumclass,st_age,st_rad,st_mass,st_logg"

    response = requests.get(url)

    if response.status_code == requests.codes.ok:
        responseSTR = StringIO(response.text)
        data = pd.read_csv(responseSTR)
    else:
        print("Error:", response.status_code, response.text)
        return

    data.to_csv("exostar_data.csv")


""" 
Gets data for all 3 models and writes them to their respective files
"""


def get_all_data():
    star_data = get_star_data()

    planet_data = get_planet_data()
    # print(planet_data[0]['name'])

    moon_data = get_moon_data(planet_data)

    with open("../data/planet_data.json", "w") as f:
        json.dump(planet_data, f)

    with open("../data/moon_data.json", "w") as f:
        json.dump(moon_data, f)

    with open("../data/star_data.json", "w") as f:
        json.dump(star_data, f)

    write_exostar_data()


def get_exoplanet_data():
    url = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_masse,pl_rade,pl_dens,pl_eqt+from+ps+where+disc_facility+=+'Transiting Exoplanet Survey Satellite (TESS)'&format=csv&"

    response = requests.get(url)

    if response.status_code == requests.codes.ok:
        # print(response.text)
        responseSTR = StringIO(response.text)
        data = pd.read_csv(responseSTR)
    else:
        print("Error:", response.status_code, response.text)
        return

    data.to_csv("exoplanet_data.csv")


if __name__ == "__main__":
    # get_all_data()
    get_exoplanet_data()
