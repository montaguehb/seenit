from blueprints import abort, make_response, g, request, Resource, Blueprint
from flask_jwt_extended import (get_jwt_identity)
from models import db
from models.community import Community
from models.user_community import UserCommunity
from schemas.community_schema import CommunitySchema
from sqlalchemy import func

community_bp = Blueprint('communities', __name__, url_prefix='/communities')
community_schema = CommunitySchema()

class Communities(Resource):
    def post(self):
        if id_ := get_jwt_identity():
            new_community = Community(name=request.get_json()["name"],
                                    subscribers=0)
            db.session.add(new_community)
            new_user_community = UserCommunity(community_id=new_community.id, user_id=id_)
            db.session.add(new_user_community)
            db.session.commit()
        return make_response(community_schema.dump(new_community), 200)