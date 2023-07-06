from flask import make_response, request
from flask_restful import Resource

from config import app, db, api, jwt
from models import User

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)