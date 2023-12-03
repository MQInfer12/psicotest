from dotenv import load_dotenv
import os
from app import app
load_dotenv(os.path.join(app.root_path, ".env"))