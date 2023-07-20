from api.blueprints import abort, make_response, g, request, Resource, Blueprint
from api.models import db
from api.models.user_post import UserPost
from api.schemas.user_post_schema import UserPostSchema
from sqlalchemy import func

user_post_bp = Blueprint('usercommunities', __name__, url_prefix='/usercommunities')

class UserPosts(Resource):
    def post(self):
        user_post_schema = UserPostSchema(exclude=("post", "user"))
        new_user_post = UserPost(**request.get_json())
        db.session.add(new_user_post)
        db.session.commit()
        return make_response(user_post_schema.dump(new_user_post), 200)