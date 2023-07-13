from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
)
from config import app, db, api, jwt, cross_origin
from models.user import User

from blueprints.users import Users
from blueprints.user_by_id import UserById
from blueprints.posts import Posts
from blueprints.posts_by_communities import PostsByCommunityId
from blueprints.post_by_id import PostById

from schemas.user_schema import UserSchema

api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Posts, "/posts")
api.add_resource(PostsByCommunityId, "/communities/<int:community_id>/posts")
api.add_resource(PostById, "/communities/<int:community_id>/posts/<int:post_id>")


@app.route("/api/v1/profile", methods=["GET"])
def profile():
    if user := db.session.get(User, id):
        return make_response(user.to_dict(), 200)


@app.route("/api/v1/signup", methods=["POST"])
def signup():
    user_schema = UserSchema(exclude=("comment", "post", "user_community"))
    req = request.get_json()
    try:
        user = user_schema.load(
            {"username": req["username"], "email": req["email"]}
        )
        user.password_digest = req.get("password", "")
        db.session.add(user)
        db.session.commit()
        token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        response = make_response({"user": user_schema.dump(user)}, 201)
        set_access_cookies(response, token)
        set_refresh_cookies(response, refresh_token)
        return response
    except Exception as e:
        return make_response({"error": str(e)}, 400)

@app.route("/api/v1/login", methods=["POST"])
def signin():
    user_schema = UserSchema()
    user_info = request.get_json()
    if user := User.query.filter_by(username=user_info.get("username", "")).first():
        if user.authenticate(user_info.get("password", "")):
            token = create_access_token(identity=user.id)
            refresh_token = create_refresh_token(identity=user.id)
            response = make_response({'user': user_schema.dump(user)}, 200)
            set_access_cookies(response, token)
            set_refresh_cookies(response, refresh_token)
            return response
    return make_response({"error": "Invalid credentials"}, 401)

if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)
