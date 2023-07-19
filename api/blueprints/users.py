from blueprints import abort, make_response, g, request, Resource, Blueprint
from models.user import User
from schemas.user_schema import UserSchema
from sqlalchemy import func

users_bp = Blueprint('users', __name__, url_prefix='/users')

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response(user_schema.dump(users), 200)