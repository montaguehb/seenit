from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.user_community import UserCommunity
from schemas.user_community_schema import UserCommunitySchema
from sqlalchemy import func

user_community_bp = Blueprint('usercommunities', __name__, url_prefix='/usercommunities')
user_community_schema = UserCommunitySchema()

class UserCommunities(Resource):
    def post(self):
        new_user_community = UserCommunity(**request.get_json())
        db.session.add(new_user_community)
        db.session.commit()
        return make_response(user_community_schema.dump(new_user_community), 200)