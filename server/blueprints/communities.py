from blueprints import abort, make_response, g, request, Resource, Blueprint
from flask_jwt_extended import (get_jwt_identity, jwt_required)
from models import db
from models.community import Community
from models.user_community import UserCommunity
from schemas.user_community_schema import UserCommunitySchema
from sqlalchemy import func

community_bp = Blueprint('communities', __name__, url_prefix='/communities')
user_community_schema = UserCommunitySchema()

class Communities(Resource):
    @jwt_required()
    def post(self):
        if id_ := get_jwt_identity():
            new_community = Community(name=request.get_json()["name"],
                                    subscribers=1)
            db.session.add(new_community)
            db.session.commit()
            db.session.refresh(new_community)
            new_user_community = UserCommunity(community_id=new_community.id, user_id=id_)
            db.session.add(new_user_community)
            db.session.commit()
        return make_response(user_community_schema.dump(new_user_community), 200)