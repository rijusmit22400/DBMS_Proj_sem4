from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
engine = create_engine(f'mysql://riju:$whiteknight28@localhost/krsr_store', echo = True)

import mysql
conn = engine.connect()
session = sessionmaker(bind = conn)

from sqlalchemy import create_engine, Column, Integer, String, Double
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    username = Column(String(255))
    full_name = Column(String(255))
    password = Column(String(255))
    role = Column(String(255)) 
    email = Column(String(255))

class Customer(Base):
    __tablename__ = 'customer'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, unique=True)
    contact = Column(String(10))
    address = Column(String(255))
    
class Admin(Base):
    __tablename__ = 'admin'
    id = Column(Integer, primary_key=True)
    user_id = Column(Integer)
    store = Column(String(10))
    contact = Column(String(255))
    
class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    description = Column(Integer, unique=True)
    
class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    category_id = Column(Integer, unique=True)
    name = Column(String(255))
    description = Column(String(255))
    price = Column(Double)
    quantity = Column(Integer)
    
class Cart(Base):
    __tablename__ = 'cart'
    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, unique=True)
    product_id = Column(Integer)
    quantity = Column(Integer)

class Invoice(Base):
    __tablename__ = 'invoice'
    id = Column(Integer, primary_key=True)
    customer_id = Column(Integer, unique=True)
    admin_id = Column(Integer)
    revenue = Column(Double)
    date = Column(String(255))