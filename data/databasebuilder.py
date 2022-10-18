from numpy import True_
import sqlalchemy
from sqlalchemy import Float, create_engine, Column, Integer, String, Sequence
from sqlalchemy.orm import declarative_base

db_url = "postgresql://scott:tiger@localhost:5432/mydatabase"
Base = declarative_base()


class Moon(Base):
    __tablename__ = "users"
    id = Column(Integer, Sequence("user_id_seq"), primary_key=True)
    name = Column(String(50))
    fullname = Column(String(50))
    nickname = Column(String(50))

    def __repr__(self):
        return "<User(name='%s', fullname='%s', nickname='%s')>" % (
            self.name,
            self.fullname,
            self.nickname,
        )


class Moon(Base):
    englishName = Column(String(50), primary_key=True)
    density = Column(Float())
    gravity = Column(Float())
    aroundPlanet = Column(String(50))
    massValue = Column(Float())
    massExponent = Column(Float())
    volValue = Column(Float())
    volExponent = Column(Float())


# class Sun(Base):
#     pass
