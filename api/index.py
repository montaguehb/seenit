from flask import make_response, request
from flask_restful import Resource
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    set_access_cookies,
    set_refresh_cookies,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies,
    unset_refresh_cookies
)

from config import app, db, api, jwt
from models.user import User
from blueprints import IntegrityError
from blueprints.users import Users
from blueprints.user_by_id import UserById
from blueprints.posts import Posts
from blueprints.posts_by_communities import PostsByCommunityId
from blueprints.post_by_id import PostById
from blueprints.user_communities import UserCommunities
from blueprints.user_communities_by_id import UserCommunitiesById
from blueprints.user_posts import UserPosts
from blueprints.user_posts_by_id import UserPostById
from blueprints.communities import Communities
from blueprints.comments import Comments
from schemas.user_schema import UserSchema

user_schema = UserSchema(exclude=("user_post.post", "comment", "post"))

api.add_resource(Users, "/users")
api.add_resource(UserById, "/users/<int:id>")
api.add_resource(Posts, "/posts")
api.add_resource(PostsByCommunityId, "/communities/<int:community_id>/posts")
api.add_resource(Comments, "/comments")
api.add_resource(PostById, "/communities/<int:community_id>/posts/<int:post_id>")
api.add_resource(UserCommunities, "/usercommunities")
api.add_resource(UserCommunitiesById, "/usercommunities/<int:id>")
api.add_resource(UserPosts, "/userposts")
api.add_resource(UserPostById, "/userposts/<int:id>")
api.add_resource(Communities, "/communities")
    
@app.route("/api/profile", methods=["GET"])
def profile():
    if user := db.session.get(User, id):
        return make_response(user.to_dict(), 200)

@app.route("/api/signup", methods=["POST"])
def signup():
    
    req = request.get_json()
    try:
        user = user_schema.load(
            {"username": req["username"], "email": req["email"]}
        )
        user.password_digest = req["password"]
        db.session.add(user)
        db.session.commit()
        token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)
        response = make_response({"user": user_schema.dump(user)}, 201)
        set_access_cookies(response, token)
        set_refresh_cookies(response, refresh_token)
        return response
    except IntegrityError:
        return make_response({"error": "Username or email already exists"}, 400)
    except Exception as e:
        return make_response({"error": str(e)}, 400)

@app.route("/api/login", methods=["POST"])
def signin():
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

@app.route("/api/me", methods=["GET"])
@jwt_required()
def me():
    if id_ := get_jwt_identity():
        if user := db.session.get(User, id_):
            return make_response(user_schema.dump(user), 200)
    return make_response({"error": "Unauthorized"}, 403)

@app.route("/api/logout", methods=["DELETE"])
def logout():
    response = make_response({}, 204)
    unset_jwt_cookies(response)
    unset_refresh_cookies(response)
    return response

if __name__ == "__main__":
    # app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)
    app.run(port=5000, debug=True)