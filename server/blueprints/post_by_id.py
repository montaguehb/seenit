from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db, joinedload, aliased
from config import select
from models.post import Post
from models.comment import Comment
from schemas.post_schema import PostSchema

post_by_id_bp = Blueprint('post_by_id', __name__, url_prefix='/communities/<int:community_id>/posts/<int:post_id>')

post_schema = PostSchema()

comment_alias = aliased(Comment)

class PostById(Resource):
    
    def get(self, community_id, post_id):
        if post := db.session.scalars(select(Post).where(Post.id==post_id)):
            return make_response(post_schema.dump(post), 200)
        else:
            return make_response({"error": "post not found"}, 404)