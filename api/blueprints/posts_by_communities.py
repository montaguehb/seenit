from api.blueprints import make_response, Resource, Blueprint, request
from api.models import db
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.models.community import Community
from api.schemas.community_schema import CommunitySchema
from api.schemas.post_schema import PostSchema
from api.models.post import Post
post_by_communities_bp = Blueprint(
    "users", __name__, url_prefix="/communities/<int:id>/posts"
)
community_schema = CommunitySchema(exclude=("post.comment",))
post_schema = PostSchema()


class PostsByCommunityId(Resource):
    def get(self, community_id):
        if posts := db.session.get(Community, community_id):
            return make_response(community_schema.dump(posts), 200)

    @jwt_required()
    def post(self, community_id):
        try:
            if id_ := get_jwt_identity():
                new_post = post_schema.load(
                    {**request.get_json(),
                    "user_id":id_,
                    "community_id":community_id,
                    "likes":0,
                    "dislikes":0,}
                )
                db.session.add(new_post)
                db.session.commit()
                return make_response(post_schema.dump(new_post), 201)
        except Exception as e:
            return make_response({"error": str(e)}, 400)
