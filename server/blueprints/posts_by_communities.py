from blueprints import make_response, Resource, Blueprint
from models import db
from models.community import Community
from schemas.community_schema import CommunitySchema

post_by_communities_bp = Blueprint(
    "users", __name__, url_prefix="/communities/<int:id>/posts"
)
community_schema = CommunitySchema(exclude=("post.comment",))


class PostsByCommunityId(Resource):
    def get(self, community_id):
        if posts := db.session.get(Community, community_id):
            return make_response(community_schema.dump(posts), 200)
