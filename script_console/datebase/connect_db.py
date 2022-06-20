from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = f'{os.environ.get("DBENGINE")}{os.environ.get("USER")}:{os.getenv("PASSWORD")}@' \
               f'{os.getenv("HOST")}:5432/morphology_db'

engine = create_engine(DATABASE_URL)
