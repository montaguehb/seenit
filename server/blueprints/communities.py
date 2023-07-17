from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.community import Community
from schemas.community_schema import CommunitySchema
from sqlalchemy import func

community_bp = Blueprint('communities', __name__, url_prefix='/communities')
community_schema = CommunitySchema()

class Communities(Resource):
    def post(self):
        new_community = Community(name=request.get_json()["name"],
                                  subscribers=0)
        db.session.add(new_community)
        db.session.commit()
        return make_response(community_schema.dump(new_community), 200)