from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.post import Post

post_by_id_bp = Blueprint('post_by_id', __name__, url_prefix='/communities/<int:community_id>/posts/<int:post_id>')

class PostById(Resource):
    
    def get(self, community_id, post_id):
        if post := db.session.get(Post, post_id):
            return make_response(post.to_dict(), 200)
        else:
            return make_response({"error": "user not found"}, 404)