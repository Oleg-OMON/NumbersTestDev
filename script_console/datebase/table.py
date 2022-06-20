import sqlalchemy as sq
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from .connect_db import engine

Base = declarative_base()
Session = sessionmaker(bind=engine)


class Orders(Base):
    __tablename__ = "orders"

    id = sq.Column(sq.Integer, primary_key=True, autoincrement=True)
    order_number = sq.Column(sq.Integer, nullable=False)
    price_in_dollar = sq.Column(sq.Integer, nullable=False)
    price_in_rub = sq.Column(sq.Integer, nullable=False)
    date_delivery = sq.Column(sq.DATE)


if __name__ == "__main__":
    session = Session()
    Base.metadata.create_all(engine)
    print('Таблица добавлена')
