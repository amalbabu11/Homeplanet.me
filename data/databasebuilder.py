from pickle import TRUE
from sqlalchemy import Float, create_engine, Column, Integer, String, Sequence
from sqlalchemy.orm import declarative_base, sessionmaker
import argparse
import pandas as pd
import pyexcel as p


import json

from tables import Col
db_url = "mysql://root:@localhost:3306/cs373"


engine = create_engine(db_url)
Base = declarative_base(engine)
Session = sessionmaker()
Session.configure(bind=engine)

# class Moon(Base):
#     __tablename__ = "moons"
#     id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
#     name = Column(String(50))
#     fullname = Column(String(50))
#     nickname = Column(String(50))

# class Planet(Base):
#     __tablename__ = 'planets'
#     pl_name = Column(String(50), primary_key = True)
#     hostname = Column(String(50))
#     pl_masse = Column(Float())
#     pl_rade = Column(Float())
#     pl_dens = Column(Float())
#     pl_eqt = Column(Float())
#     img = Column(String(80))
    

# class Star(Base):
#     __tablename__ = 'stars'
#     star_name  = Column(String(50), primary_key = True)
#     st_teff = Column(Float())
#     st_lumclass = Column(Float())
#     st_age = Column(Float())
#     st_rad = Column(Float())
#     st_mass = Column(Float())
#     st_logg = Column(Float())
#     img = Column(String(80))


class Moon(Base):
    __tablename__ = "moons"
    englishName = Column(String(50), primary_key = True)
    density = Column(Float())
    gravity = Column(Float())
    aroundPlanet = Column(String(50))
    massValue = Column(Float())
    massExponent = Column(Float())
    volValue = Column(Float())
    volExponent = Column(Float())
    img = Column(String(80))



def fillPlanetTable():
    dataPath = '../data/exoplanet_data.csv'
    data = pd.read_csv(dataPath)
    data = data.loc[:, ~data.columns.str.contains('^Unnamed')]

    print(data.head())


    data.to_sql(
        'planets',
        engine,
        if_exists='replace',
        index=False,
        chunksize=1,
        dtype={
            "pl_name": String(50),
            "hostname": String(50),
            "pl_masse": Float,
            "pl_rade": Float,
            "pl_dens":  Float,
            "st_eqt": Float,
            "img" : String(80)
        }
    )

def fillStarTable():
    dataPath = '../data/exostar_data.csv'
    data = pd.read_csv(dataPath)
    data = data.loc[:, ~data.columns.str.contains('^Unnamed')]

    print(data.head())


    data.to_sql(
        'stars',
        engine,
        if_exists='replace',
        index=False,
        chunksize=1,
        dtype={
            "star_name": String(50),
            "st_teff": Float,
            "st_lumclass": String(20),
            "st_age":  Float,
            "st_rad": Float,
            "st_mass": Float,
            "st_logg" : Float,
            "img" : String(80)
        }
    )


def fillMoonTable():
    Base.metadata.create_all(engine)
    dataPath = '../data/moon_data.json'
    with open(dataPath, 'r') as f:
        data = json.load(f)

    rows = []
    keys = ['massValue', 'massExponent', 'volValue', 'volExponent', 'englishName', 'density', 'gravity', 'aroundPlanet']
    for elem in data:
        if elem['mass'] is not None:

            elem['massValue'] = elem['mass']['massValue']
            elem['massExponent'] = elem['mass']['massExponent']
            

        if elem['vol'] is not None:
            elem['volValue'] = elem['vol']['volValue']
            elem['volExponent'] = elem['vol']['volExponent']
        
        elem['aroundPlanet'] = elem['aroundPlanet']['planet']

        columnValues = {key : elem[key] if key in elem.keys() else None for key in keys}

        rows.append(Moon(**columnValues))

    session = Session()
    session.add_all(rows)
    session.commit()


def queryDatabase():
    session = Session()
    for instance in session.query(Moon).order_by(Moon.englishName):
        print(instance.englishName)


    
if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--create', help = 'create table', action = 'store_true')
    parser.add_argument('--fill', help = 'fill table')
    parser.add_argument('--query', help = 'fill table', action = 'store_true')

    args = parser.parse_args()
    if args.fill  == 'stars' or args.fill == 'all':
        fillStarTable()
    elif args.fill == 'moons' or args.fill == 'all':
        fillMoonTable()
    elif args.fill == 'planets' or args.fill == 'all':
        fillPlanetTable()
