from django.core.management.base import BaseCommand
from APIserver.models import Orders
from bs4 import BeautifulSoup
import requests
from oauth2client.service_account import ServiceAccountCredentials
from apiclient import discovery
import httplib2
import datetime


class Command(BaseCommand):
    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        def get_rate():
            # Функция получения курса доллара

            current_date = datetime.datetime.now()
            current_date_string = current_date.strftime('%d/%m/%Y')
            centralBankUrl = f'https://www.cbr.ru/scripts/XML_daily.asp?date_req={current_date_string}'

            resp = requests.get(centralBankUrl)

            with open('file.xml', 'w') as file:
                file.write(resp.text)

            with open('file.xml', 'r') as file1:
                src = file1.read()

            soup = BeautifulSoup(src, 'lxml')
            dollar_curs = float(soup.find_all('valute')[10].find('value').text.replace(',', '.'))

            return int(dollar_curs)

        def get_date():
            CREDENTIALS_FILE = 'C:/Users/olzas/NumbersTestTask/myproject.json'
            spreadsheet_id = '1RNK-HTAJKTwW1GDuCEUpNrwMXDVtj4ruTXZ-hlGWOC0'

            # Авторизуемся и получаем service — экземпляр доступа к API
            credentials = ServiceAccountCredentials.from_json_keyfile_name(
                CREDENTIALS_FILE,
                ['https://www.googleapis.com/auth/spreadsheets',
                 'https://www.googleapis.com/auth/drive'])
            httpAuth = credentials.authorize(httplib2.Http())
            service = discovery.build('sheets', 'v4', http=httpAuth)

            # Чтения файла
            values = service.spreadsheets().values().get(
                spreadsheetId=spreadsheet_id,
                range='Лист1',
                majorDimension='ROWS'
            ).execute()

            list_date = values['values'][1::]

            for order in list_date:
                order_id = order[1]
                price_in_dollar = int(order[2])
                price_in_rub = int(price_in_dollar * get_rate())
                date_delivery = order[3]

                order = Orders.objects.create(order_id=order_id,
                                              price_in_dollar=price_in_dollar,
                                              price_in_rub=price_in_rub,
                                              date_delivery=date_delivery)
                order.save()

        get_date()
