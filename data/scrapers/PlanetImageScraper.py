from re import L
from bs4 import BeautifulSoup
import requests
import pandas as pd



url = "http://www.exoplanetkyoto.org/exohtml/"

def modifyName(name):
    name = name.replace(' ', '-')
    return name[0:-2] + '_' + name[-1]

def getUrl(name):
    name = modifyName(name)
    return url + name + '.html'

def getImageAddress(name: str):
    planet_url = getUrl(name)
    response = requests.get(planet_url)

    if response.status_code == requests.codes.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        img = soup.find('tr').find_all('td')[1].find('img')['src']

        return url + img[2 : len(img)]
    else:
        return

def getOrbitUrl(name):
    name = modifyName(name)
    orbit_url = url  + name + 'Orbit.html'
    return orbit_url

if __name__ == '__main__':
    planet = 'TOI-163 b'
    print(getUrl(planet))
    print(getOrbitUrl(planet))
    print(getImageAddress(planet))

