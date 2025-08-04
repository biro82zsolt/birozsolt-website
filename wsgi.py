import sys
import os

# 1️⃣ Add the project root to the Python path
sys.path.insert(0, os.path.dirname(__file__))

# 2️⃣ Import the Flask app
from app import app as application
