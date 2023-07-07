from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.post import Post
from sqlalchemy import func

users_bp = Blueprint("users", __name__, url_prefix="/posts")


class Posts(Resource):
    def get(self):
        posts = Post.query.all()
        return make_response(
            [
                post.to_dict(
                    only=(
                        "id",
                        "title",
                        "likes",
                        "dislikes",
                        "created_at",
                        "updated_at",
                        "community"
                    )
                )
                for post in posts
            ],
            200,
        )
