from script_console.datebase.connect_db import engine
from .table import Orders
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=engine)
session = Session()

# Функция добавления данных в БД
def add_date(order_number, price_in_dollar, price_in_rub, date_delivery):
    date = Orders(order_number=order_number,
                  price_in_dollar=price_in_dollar,
                  price_in_rub=price_in_rub,
                  date_delivery=date_delivery)
    session.add(date)
    session.commit()
    print(f'Заказ {order_number} добавлен!')
    return True



