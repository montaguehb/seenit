from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.post import Post
from schemas.post_schema import PostSchema
post_by_id_bp = Blueprint('post_by_id', __name__, url_prefix='/communities/<int:community_id>/posts/<int:post_id>')

post_schema = PostSchema()
class PostById(Resource):
    
    def get(self, community_id, post_id):
        if post := db.session.get(Post, post_id):
            return make_response(post_schema.dump(post), 200)
        else:
            return make_response({"error": "user not found"}, 404)