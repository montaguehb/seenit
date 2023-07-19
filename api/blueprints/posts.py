from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.post import Post
from sqlalchemy import func
from schemas.post_schema import PostSchema

users_bp = Blueprint("users", __name__, url_prefix="/posts")
post_schema = PostSchema(many=True, exclude=("comment", "user.user_post"))

class Posts(Resource):
    def get(self):
        return make_response(post_schema.dump(Post.query.all()), 200)
