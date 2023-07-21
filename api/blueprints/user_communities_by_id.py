from api.blueprints import abort, make_response, g, request, Resource, Blueprint
from api.models import db
from api.models.user_community import UserCommunity
from sqlalchemy import func

user_communities_by_id_bp = Blueprint('usercommunitiesbyid', __name__, url_prefix='/usercommunities/<int:id>')

class UserCommunitiesById(Resource):
    def delete(self, id):
        if user_community := db.session.get(UserCommunity, id):
            db.session.delete(user_community)
            db.session.commit()
            return make_response({"message": "succesfully deleted"}, 200)