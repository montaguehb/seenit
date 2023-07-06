from blueprints import abort, make_response, g, request, Resource, Blueprint
from models import db
from models.user import User
from sqlalchemy import func

users_bp = Blueprint('users', __name__, url_prefix='/users')

class Users(Resource):
    def get(self):
        users = User.query.all()
        return make_response([user.to_dict() for user in users], 200)