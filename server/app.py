from flask import make_response, request
from flask_restful import Resource

from config import app, db, api, jwt
from models.user import User

from blueprints.users import Users

api.add_resource(Users, "/users")

@app.route("/api/v1/profile", methods=["GET"])
def profile():
    if user := db.session.get(User, id):
        return make_response(user.to_dict(), 200)
    
if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)