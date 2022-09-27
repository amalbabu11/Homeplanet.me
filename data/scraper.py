import pandas as pd
import json
import requests


def get_response_dict(request_url, headers = None):
    response = requests.get(request_url, headers=headers)

    if response.status_code == requests.codes.ok:
        data = json.loads(response.text)
        return data
    else:
        print("Error:", response.status_code, response.text)
        return


def get_planet_data():
    with open('keys.txt', 'r') as f:
        my_key = f.read()
    planet_url = 'https://api.api-ninjas.com/v1/planets?'

    # only keep planets in our solar system
    criteria = 'max_distance_light_year=0.5'
    # get request data 
    data = get_response_dict(planet_url + criteria, headers = {'X-Api-Key' : my_key})

    # create dataframe with values
    # data = pd.DataFrame(data)
    return data

def get_moon_data(planet_data):
    # list of all planets
    # api url
    url = 'https://api.le-systeme-solaire.net/rest/bodies/'
    moon_data = []

    # send a request for 
    # for planet in planet_names:
    #     body = f'{{{planet}}}'
    #     response = requests.get(url + body)
    #     if response.status_code == requests.codes.ok:
    #         with open('planet_data.txt', 'w') as f:
    #             data = json.loads(response.text)
    #             # make sure the planet actually has a moon
    #             if data['moons'] is not None:
    #                 moon_names = []
    #                 for moon_names in data['moons']:
    #                     moon_names.append(moon_names['moon'])
    #                     response = requests.get(moon_names['rel']).text

                        
                    

                    
    #                 # internal storage structure will be a list of lists
    #                 planet_data.at[planet_data[planet_data.name == planet].index[0], 'moons'] = moons
    #     else:
    #         print("Error:", response.status_code, response.text)

    moon_data = []
    for planet in planet_data:

        planet_name = planet['name']
        body = f'{{{planet_name}}}'

        data = get_response_dict(url + body)
        if data['moons'] is not None:
            planet['moons'] = []
            for moon in data['moons']:
                    planet['moons'].append(moon['moon'])
                    moon_data.append(get_response_dict(moon['rel']))
    return moon_data
        

def get_star_data():
    url = 'https://api.le-systeme-solaire.net/rest/bodies/soleil'

    star_data = []
    star_data.append(get_response_dict(url))
    return star_data


def get_all_data():
    star_data = get_star_data()

    planet_data = get_planet_data()
    # print(planet_data[0]['name'])

    moon_data = get_moon_data(planet_data)

    

    with open('../data/planet_data.json', 'w') as f:
        json.dump(planet_data, f)

    with open('../data/moon_data.json', 'w') as f:
        json.dump(moon_data, f)

    with open('../data/star_data.json', 'w') as f:
        json.dump(star_data, f)

    


if __name__ == '__main__':
    get_all_data()