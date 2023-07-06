from flask import make_response, request
from flask_restful import Resource

from config import app, db, api, jwt
from models.user import User

from blueprints.users import Users
from blueprints.posts import Posts
from blueprints.posts_by_communities import PostsByCommunityId
from blueprints.post_by_id import PostById

api.add_resource(Users, "/users")
api.add_resource(Posts, "/posts")
api.add_resource(PostsByCommunityId, "/communities/<int:community_id>/posts")
api.add_resource(PostById, "/communities/<int:community_id>/posts/<int:post_id>")

@app.route("/api/v1/profile", methods=["GET"])
def profile():
    if user := db.session.get(User, id):
        return make_response(user.to_dict(), 200)
    
if __name__ == "__main__":
    app.run(port=5000, debug=True, use_debugger=False, use_reloader=False)