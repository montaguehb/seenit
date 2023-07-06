from flask import make_response, request
from flask_restful import Resource

from config import app, db, api, jwt

from blueprints.users import Users

api.add_resource(Users, "/users")

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)