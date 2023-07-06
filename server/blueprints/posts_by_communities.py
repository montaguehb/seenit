from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.post import Post
from sqlalchemy import func

post_by_communities_bp = Blueprint('users', __name__, url_prefix='/communities/<int:id>/posts')

class PostsByCommunityId(Resource):
    def get(self, community_id):
        posts = Post.query.filter_by(community_id=community_id).all()
        return make_response([post.to_dict() for post in posts], 200)