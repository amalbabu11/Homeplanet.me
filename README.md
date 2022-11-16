# group12-cs373 : HomePlanet

**Canvas/Discord Group Number:** 11 AM - Group 12

**Names of the team members:**
| Name | GitLabID | UTEID |
| ------ | ------ | ------ |
| Amal Babu | [amalbabu12](https://gitlab.com/amalbabu12) | ab73464 |
| Summer Ely (Phase III Leader) | [spe358](https://gitlab.com/spe358) | spe358 |
| Jinjie Liu (Phase II Leader) | [JinjieLiu](https://gitlab.com/JinjieLiu) | jl82669 |
| Nathan Sussman (Phase I Leader) | [NathanSuss](https://gitlab.com/NathanSuss) | nes924 |
| Megan Zhao | [banye0913](https://gitlab.com/banye0913) | dz4782 | 

**Website URL:** homeplanet.me

**GitLab URL:**  https://gitlab.com/NathanSuss/group12-cs373

**GitLab Pipeline:** https://gitlab.com/NathanSuss/group12-cs373/-/pipelines

**Git SHA:** 45ad2f8d5632ad46b7852d283db86f40e1694a1d

**Postman API Documentation:** https://documenter.getpostman.com/view/20771905/2s83tFHWkc

## Project Proposal: HomePlanet
**Description:** HomePlanet is an astronomy database with information on Planets, Stars, and Moons, as well as information on whether or not these celestial bodies could potentially sustain human life or other types of life.

**RESTful APIs / Disparate Data Sources**
1. https://api-ninjas.com/api/planets to get information on planets
2. https://api.le-systeme-solaire.net/en/ to get information on moons
3. https://exoplanetarchive.ipac.caltech.edu/docs/API_mission_stars.html to get information on stars
4. https://api.nasa.gov/ to get NASA images 
5. https://en.wikipedia.org/api/rest_v1/#/ to scrape Wikipedia pages such as https://en.wikipedia.org/wiki/List_of_potentially_habitable_exoplanets


**Models**
1. Planets/Exoplanets (1000+ instances)
    - Filterable Attributes: Mass, radius, orbital period, temperature, distance from Earth, gravity, number of moons
    - Searchable Attributes: Name, whether it is potentially habitable or not, names of moons that orbit it, name of the star it orbits, planet type (Gas giant, Terrestrial, etc)
    - Connection to others: Each planet orbits a star and some planets have moons
3. Stars (1000+ instances)
    - Filterable Attributes: Mass, radius, apparent magnitude (brightness), absolute magnitude, distance from Earth in lightyears
    - Searchable Attributes: Name, constellation that the star belongs to, names of planets that orbit it, names of moons that orbit it
    - Connection to others: Each star will have moons and planets that orbit it 
3. Moons (100+ instances)
    - Filterable Attributes: Mass, radius, gravity, temperature, axial tilt
    - Searchable Attributes: Name, planet it orbits, whether it is potentially habitable or not
    - Connection to others: Each moon orbits a planet which orbits a star

**Media on Instance Pages**
- Each Model will have multiple images taken by NASA
- Each planet will have graphs comparing its features like temperature, gravity, atmosphere, etc to Earth's
- If available, a diagram of the model's orbit will be included

**Questions our website will answer**
- What factors go into determining if a planet is habitable? 
- How many potential habitable planets are there in the universe?
- What planets and/or moons have features most similar to Earth?

## Phase I Time Log
| Name | Estimated Time | Actual Time |
| ------ | ------ | ------ |
| Amal Babu | 10 hours | 10 hours|
| Summer Ely | 15 hours | 18 hours |
| Jinjie Liu | 10 hours | 10 hours |
| Nathan Sussman | 12 hours| 16 hours |
| Megan Zhao | 10 hours | 6 hours |

## Phase II Time Log
| Name | Estimated Time | Actual Time |
| ------ | ------ | ------ |
| Amal Babu | 15 hours | 25 hours|
| Summer Ely | 20 hours | 29 hours |
| Jinjie Liu | 15 hours | 25 hours |
| Nathan Sussman | 25 hours| 27 hours |
| Megan Zhao | 10 hours | 15 hours |

## Phase III Time Log
| Name | Estimated Time | Actual Time |
| ------ | ------ | ------ |
| Amal Babu | 10 hours | 15 hours|
| Summer Ely | 15 hours | 25 hours |
| Jinjie Liu | 10 hours | 15 hours |
| Nathan Sussman | 15 hours| 25 hours |
| Megan Zhao | 10 hours | 10 hours |

## Comments
Overall file structure, List classes, Sorting, and Searching adapted from [FindingFootprints](https://gitlab.com/AlejandroCantu/group2)

Instance Model, About Page, TeamInfo, and ToolInfo adapted from [Electrends](https://gitlab.com/dandom25/electrends/)

Makefile credit to [Sustainability](https://gitlab.com/caitlinlien/cs373-sustainability/-/blob/master/makefile)

Dockerfile credit to [FindAHome](https://gitlab.com/aghayalod/find-a-home/-/blob/main/findahome-app/Dockerfile)

Jest and Selenium tests credit to [AnimalWatch](https://gitlab.com/JohnPowow/animalwatch/)
