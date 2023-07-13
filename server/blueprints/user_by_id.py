from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from schemas.user_schema import UserSchema
from models.user import User

user_by_id_bp = Blueprint('users', __name__, url_prefix='/users')
user_schema = UserSchema()
class UserById(Resource):
    
    def get(self, id):
        if user := db.session.get(User, id):
            return make_response(user_schema.dump(user), 200)
        else:
            return make_response({"error": "user not found"}, 404)